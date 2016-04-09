// Return an interger between 0 and 9
function rollD10() {
  return Math.floor(Math.random() * (9));
}

// Roll a single craft pool of dice
// Returns total number of threshold successes, 0 for failure, -1 for botch
function rollPool(hash) {
  var poolSize = hash.initialPoolSize;

  var i = 0;
  var successes = hash.willpowerSpend + hash.stuntSuccesses;
  var resultAry = [0,0,0,0,0,0,0,0,0,0];

  while ( i < poolSize) {
    i += 1;
    var die = rollD10();
    resultAry[die] += 1;
    switch(die) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        if (hash.flawlessHandiworkRepurchase) { poolSize += 1; }
        break;
      case 7:
        successes += 1;
        break;
      case 8:
        successes += 1;
        break;
      case 9:
        successes += 1;
        break;
      case 0:
        successes += 2;
        if (hash.flawlessHandiworkMethod) { poolSize += 1; }
        break;
    }
  }

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
    attemptArray[index] = rollAttempt(hash);
  });
  return attemptArray;
}
