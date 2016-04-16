function fetchResultsJS(theForm,event) {
  event.preventDefault();

  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute", "intelligence", "stuntDice", "stuntSuccesses", "numAttempts", "terminus", "targetThreshold", "essence", "difficulty"];
  var formBooleanArray = ["craftSpeciality","fullExcellency", "willpowerSpend", "flawlessHandiworkMethod", "flawlessHandiworkRepurchase", "supremeMasterworkFocus",
                          "supremeMasterworkFocusRepurchase", "supremeMasterworkFocus2ndRepurchase", "experientialConjuringOfTrueVoid", "unbrokenImageFocus",
                          "firstMovementOfTheDemiurge", "breachHealingMethod", "divineInspirationTechnique"];

  var returnFloatArray = ["meanSuc", "stdDevSuc", "percentSuc"];
  var returnIntegerArray = ["medianSuc","initialPoolSize"];

  var hash = {};

  $.each(formIntegerArray, function(index, item) { hash[item] = parseInt(theForm.elements.namedItem(item).value); });
  $.each(formBooleanArray, function(index, item) { hash[item] = (~~theForm.elements.namedItem(item).checked); });
  hash.initialPoolSize = (Math.min(hash.craftAbility, hash.craftArtifact) + hash.craftAttribute)*(1 + hash.fullExcellency)
                        + hash.stuntDice + hash.craftSpeciality
                        + (hash.breachHealingMethod + hash.experientialConjuringOfTrueVoid)*hash.essence;
  if(hash.ess >= 3 && hash.experientialConjuringOfTrueVoid) { hash.initialPoolSize += hash.intelligence; }
  if(hash.breachHealingMethod) { hash.difficulty--; }
  if(hash.difficulty < 0) { hash.difficulty = 0; }

  var attemptArray = collectAttemptStatistics(hash);

  var data = {};

  data.meanSuc = arrayMean(attemptArray);
  data.medianSuc = arrayMedian(attemptArray);
  data.stdDevSuc = arrayStdDev(attemptArray);
  data.percentSuc = arrayPercentAboveThreshold(attemptArray,parseInt(hash.targetThreshold));
  data.initialPoolSize = (Math.min(parseInt(hash.craftAbility), parseInt(hash.craftArtifact)) + parseInt(hash.craftAttribute))*(1 + parseInt(hash.fullExcellency))
                      + parseInt(hash.stuntDice) + parseInt(hash.craftSpeciality);
  data.hist = arrayHistogram(attemptArray);

  $.each(returnFloatArray, function(index, item) { document.getElementById(item).innerHTML = data[item].toFixed(2); });
  $.each(returnIntegerArray, function(index, item) { document.getElementById(item).innerHTML = data[item]; });

  renderHistogram(data, hash, theForm);

  // $.ajax({
  //   type: 'GET',
  //   url: '/exaltedcraftingdieroller',
  //   data: hash,
  //   dataType: 'json',
  //   success: function(data) {
  //     $.each(returnFloatArray, function(index, item) { document.getElementById(item).innerHTML = data[item].toFixed(2); });
  //     $.each(returnIntegerArray, function(index, item) { document.getElementById(item).innerHTML = data[item]; });
  //     renderHistogram(data, hash, theForm);
  //   }
  // });
}
