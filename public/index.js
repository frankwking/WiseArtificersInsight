function fetchResultsJS(theForm) {
  $.ajax({
    type: 'GET',
    url: '/exaltedcraftingdieroller',
    data: {
      craftAbility: theForm.elements["craftAbility"].value,
      craftArtifact: theForm.elements["craftArtifact"].value,
      craftAttribute: theForm.elements["craftAttribute"].value
    },
    dataType: 'json',
    success: function(data) {
      document.getElementById("meanSuc").innerHTML = data["meanSuc"].toFixed(2);
      document.getElementById("medianSuc").innerHTML = data["medianSuc"];
      document.getElementById("stdDevSuc").innerHTML = data["stdDevSuc"].toFixed(2);
    }
  })
}
