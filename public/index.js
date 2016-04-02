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
      $.each(returnFloatArray, function(index, item) { document.getElementById(item).innerHTML = data[item].toFixed(2); });
      $.each(returnIntegerArray, function(index, item) { document.getElementById(item).innerHTML = data[item]; });

      var dataset = [];
      var dataset2 = [];
      $.each(data.hist, function(index, item) {dataset.push(item)});
      $.each(data.hist, function(index, item) {dataset2.push([parseInt(index), item])});

      d3.selectAll("svg > *").remove();

      var svg = d3.select("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

      var xScale = d3.scale.linear()
        .domain([d3.min(dataset2, function(d) {return d[0];}), d3.max(dataset2, function(d) {return d[0];})])
        .range([0, chartWidth]);

      var numBars = d3.max(dataset2, function(d) {return d[0];}) - d3.min(dataset2, function(d) {return d[0];});

      var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset2, function(d) {return d[1];})])
        .range([0, chartHeight]);

      svg.selectAll("rect")
        .data(dataset2)
        .enter()
        .append("rect")
        .attr("x", function(d) {return xScale(d[0]);})
        .attr("y", function(d) {return chartHeight - yScale(d[1]);})
        .attr("width", chartWidth / numBars - barPadding)
        .attr("height", function(d) {return yScale(d[1]);})
        .attr("fill","teal");
    }
  });
}
