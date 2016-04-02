function fetchResultsJS(theForm,event) {
  event.preventDefault();

  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute", "stuntDice", "stuntSuccesses", "numAttempts", "terminus", "targetThreshold", "essence"];
  var formBooleanArray = ["craftSpeciality", "fullExcellency", "willpowerSpend", "flawlessHandiworkMethod", "flawlessHandiworkRepurchase"];

  var returnFloatArray = ["meanSuc", "stdDevSuc", "percentSuc"];
  var returnIntegerArray = ["medianSuc","initialPoolSize"];

  var chartWidth = 750;
  var chartHeight = 250;
  var barPadding = 1;

  var hash = {};

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
      var hist = data.hist;

      var dataset = [];
      $.each(hist, function(index, item) {dataset.push(item)})

      var svg = d3.select(".chart")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d,i){ return i * (chartWidth / dataset.length);})
        .attr("y", function(d) {return chartHeight - d})
        .attr("width", chartWidth / dataset.length - barPadding)
        .attr("height",function(d) {return d})
        .attr("fill","teal");
    }
  })
}
