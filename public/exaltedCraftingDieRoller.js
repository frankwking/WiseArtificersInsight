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
        break;
    }
  }
  console.log(resultAry);
  console.log(successes);
}
