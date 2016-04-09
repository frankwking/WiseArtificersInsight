// Return an interger between 0 and 9
function rollD10() {
  return Math.floor(Math.random() * (9));
}

// Roll a single craft pool of dice
// Returns total number of successes or -1 if that total is below the difficulty of the roll
function rollPool(initialPoolSize, hash) {
  var poolSize = initialPoolSize;
  var difficulty = 5;

  var i = 0;
  var successes = 0;
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

  if ((successes -  difficulty) < 0 && resultAry[1] > 0) { successes = -1; }

  return successes;
}

// Roll a crafting attemp, consisting of terminus number of craft pools
// Returns total threshold successes for the crafting attempt, -1 if botched
function rollAttempt(hash) {
  // var initialPoolSize =  ([hash.craftAbility, hash.craftArtifact].min + hash.craftAttribute)*(1 + hash.fullExcellency) + hash.stuntDice + hash.craftSpeciality;
  var initialPoolSize = (Math.min(parseInt(hash.craftAbility), parseInt(hash.craftArtifact)) + parseInt(hash.craftAttribute))*(1 + parseInt(hash.fullExcellency))
                      + parseInt(hash.stuntDice) + parseInt(hash.craftSpeciality);
  console.log(initialPoolSize);
  return initialPoolSize;
}
