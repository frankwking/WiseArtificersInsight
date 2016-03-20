function fetchResultsJS(theForm) {
  var r = new XMLHttpRequest();
  r.open("GET", "/exaltedcraftingdieroller?"+param(formToParams(theForm)), true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    response = JSON.parse(r.responseText);
    console.log(r.responseText);
    console.log(response);
    console.log(response["meanSuc"]);
    document.getElementById("meanSuc").innerHTML = roundToPlacesString(response["meanSuc"]);
  };
  r.send();

}

function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}

function formToParams(theForm) {
  var elements = theForm.elements;
  var params = {};
  var validKeys = ["craftAbility", "craftArtifact","craftAttribute"];
  for(var i = 0; i < validKeys.length; i++) {
    if (theForm.elements.hasOwnProperty(validKeys[i])) {
      params[validKeys[i]] = elements[validKeys[i]].value;
    }
  }
  return params
}

function roundToPlacesString(s, p=2) {
  return s.toString().split('.').map(function(sub, i) { return i ? sub.slice(0,p) : sub }).join('.')
}
