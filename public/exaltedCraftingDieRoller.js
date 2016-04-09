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
  }

}
