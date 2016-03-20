function fetchResultsJS(theForm) {
  var r = new XMLHttpRequest();
  r.open("GET", "/exaltedcraftingdieroller?"+param(formToParams(theForm)), true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    alert("Success: " + r.responseText);
  };
  console.log(param(formToParams(theForm)))
  r.send();
  console.log(r)
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
  console.log(params);
  return params
}
