// Return an interger between 0 and 9
function rollD10() {
  return Math.floor(Math.random() * (9));
}

// Roll a single craft pool of dice
function rollPool(initialPoolSize) {
  var poolSize = initialPoolSize;

  var i = 0;
  var successes = 0;
  var resultAry = [0,0,0,0,0,0,0,0,0,0];

  while ( i < poolSize) {
    i += 1;
    var die = rollD10();
    switch(die) {
      case 1:
        resultAry[die] += 1;
        break;
      case 2:
        resultAry[die] += 1;
        break;
      case 3:
        resultAry[die] += 1;
        break;
      case 4:
        resultAry[die] += 1;
        break;
      case 5:
        resultAry[die] += 1;
        break;
      case 6:
        resultAry[die] += 1;
        break;
      case 7:
        resultAry[die] += 1;
        successes += 1;
        break;
      case 8:
        resultAry[die] += 1;
        successes += 1;
        break;
      case 9:
        resultAry[die] += 1;
        successes += 1;
        break;
      case 0:
        resultAry[die] += 1;
        successes += 2;
        break;
    }
  }
  console.log(resultAry);
  console.log(successes);
}
