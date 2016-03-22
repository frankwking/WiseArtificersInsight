function fetchResultsJS(theForm,event) {
  event.preventDefault();

  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute"];
  var formBooleanArray = ["craftSpeciality"];

  var returnFloatArray = ["meanSuc","stdDevSuc"];
  var returnIntegerArray = ["medianSuc","initialPoolSize"];

  var hash = {}
  $.each(formIntegerArray, function(index, item) { hash[item] = theForm.elements.namedItem(item).value; });
  $.each(formBooleanArray, function(index, item) { hash[item] = (~~theForm.elements.namedItem(item).checked); });

  $.ajax({
    type: 'GET',
    url: '/exaltedcraftingdieroller',
    data: hash,
    dataType: 'json',
    success: function(data) {
      $.each(returnFloatArray, function(index, item) { document.getElementById(item).innerHTML = data[item].toFixed(2); })
      $.each(returnIntegerArray, function(index, item) { document.getElementById(item).innerHTML = data[item]; })
    }
  })
}
