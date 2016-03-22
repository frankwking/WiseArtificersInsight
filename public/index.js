function fetchResultsJS(theForm,event) {
  event.preventDefault();
  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute"];
  var formBooleanArray = ["craftSpeciality"];
  var hash = {}
  $.each(formIntegerArray, function(index, item) { hash[item] = theForm.elements.namedItem(item).value;});
  $.each(formBooleanArray, function(index, item) {hash[item] = (~~theForm.elements.namedItem(item).checked);});
  $.ajax({
    type: 'GET',
    url: '/exaltedcraftingdieroller',
    data: hash,
    dataType: 'json',
    success: function(data) {
      document.getElementById("meanSuc").innerHTML = data["meanSuc"].toFixed(2);
      document.getElementById("medianSuc").innerHTML = data["medianSuc"];
      document.getElementById("stdDevSuc").innerHTML = data["stdDevSuc"].toFixed(2);
      // Need to update the initialPoolSize here
    }
  })
}

function isFormInteger(value){
  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute"]
  return $.inArray(value, formIntegerArray) > -1
}
