// Return an interger between 0 and 9
function rollD10() {
  return Math.floor(Math.random() * (10));
}

// Roll a single craft pool of dice
// Returns total number of threshold successes, 0 for failure, -1 for botch
function rollPool(hash) {
  var poolSize = hash.initialPoolSize;

  var i = 0;
  var successes = hash.willpowerSpend + hash.stuntSuccesses + hash.experientialConjuringOfTrueVoid + hash.storytellerSuccesses;
  var resultAry = [0,0,0,0,0,0,0,0,0,0];
  var sucAry = [2,0,0,0,0,0,0,1,1,1];

  if (hash.supremeMasterworkFocus) { sucAry[9] = 2; }
  if (hash.supremeMasterworkFocusRepurchase) { sucAry[8] = sucAry[9] = 2; }
  if (hash.supremeMasterworkFocus2ndRepurchase) { sucAry[7] = sucAry[8] = sucAry[9] = 2; }

  var FMDNeedToConvert = 0;
  var FMDAvailFailures = 0;
  var HMUsucCount = 0;
  var HMUCurrentDieFromDTI = 0;

  if (hash.SHTperAttempt) {
    hash.SHTperAttempt = 0;
    successes += 10;
  }

  while ( i < poolSize) {
    i += 1;
    var die = rollD10();
    resultAry[die] += 1;
    successes += sucAry[die];

    if (hash.firstMovementOfTheDemiurge && hash.experientialConjuringOfTrueVoid) {
      if(1 >= die && die <= 6) { FMDAvailFailures += 1; }
      else if (resultAry[die] % 3 == 0) { FMDNeedToConvert +=1; }
      while (FMDNeedToConvert > 0 && FMDAvailFailures > 0) {
        var toConvert = 0;
        for (var j = 6; j >= 1; j--) { if (resultAry[j] > 0) { toConvert = j; } }
        resultAry[toConvert]--;
        resultAry[10]++;
        if (hash.flawlessHandiworkMethod) { poolSize += 1; }
        if (resultAry[10] % 3 == 0) { FMDNeedToConvert +=1; }
        FMDNeedToConvert--;
        FMDAvailFailures--;
      }
    }

    if (hash.flawlessHandiworkRepurchase && die == 6) { poolSize += 1; }
    if (hash.flawlessHandiworkMethod && die == 0) { poolSize += 1; }

    if (hash.holisticMiracleUnderstanding && HMUCurrentDieFromDTI && HMUsucCount < 3 && (die == 0 || die >= 7)) {
      HMUsucCount++;
      if (HMUsucCount == 3) { poolSize += 3}
    }

    HMUCurrentDieFromDTI = 0;
    if (hash.divineInspirationTechnique && successes % 3 == 0 && successes != 0) {
      poolSize += 1;
      HMUCurrentDieFromDTI = 1;
    }
  }

  if (hash.unbrokenImageFocus) { successes += hash.essence + resultAry[7] + resultAry[8] + resultAry[9] + resultAry[0]*2; }

  if (successes  < hash.difficulty ) {
    if (successes < 1 && resultAry[1] > 0) {
      successes = -1;
    } else {
      successes = 0;
    }
  } else {
    successes = successes - hash.difficulty;
  }

  return successes;
}

// Roll a crafting attemp, consisting of terminus number of craft pools
// Returns total threshold successes for the crafting attempt, -1 if botched
function rollAttempt(hash) {
  var poolArray = new Array(hash.terminus);
  var totSuc = 0;
  $.each(poolArray, function(index) {
    poolArray[index] = rollPool(hash);
    totSuc += poolArray[index];
  });
  $.each(poolArray, function(index) {
    if (poolArray[index] < 0) {
      totSuc = 0;
    }
  });
  return totSuc;
}

// Roll numAttempts different crafting attempts to gather statistics
// Returns mean number of threshold successes per attempt
function collectAttemptStatistics(hash) {
  var attemptArray = new Array(hash.numAttempts);
  $.each(attemptArray, function(index) {
    hash.SHTperAttempt = hash.sunHeartTenacity;
    attemptArray[index] = rollAttempt(hash);
  });
  return attemptArray;
}
