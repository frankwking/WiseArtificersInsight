function fetchResultsJS(theForm,event) {
  event.preventDefault();

  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute", "stuntDice", "stuntSuccesses", "numAttempts", "terminus", "targetThreshold", "essence"];
  var formBooleanArray = ["craftSpeciality", "fullExcellency", "willpowerSpend", "flawlessHandiworkMethod", "flawlessHandiworkRepurchase"];

  var returnFloatArray = ["meanSuc", "stdDevSuc", "percentSuc"];
  var returnIntegerArray = ["medianSuc","initialPoolSize"];

  var margin = {top: 20, right: 20, bottom: 20, left: 40};
  var svgWidth = 750;
  var svgHeight = 250;
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
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
        .attr("width", svgWidth)
        .attr("height", svgHeight);

      var numBars = d3.max(dataset2, function(d) {return d[0];}) - d3.min(dataset2, function(d) {return d[0];});
      var barWidth = chartWidth / numBars - barPadding;

      var xScale = d3.scale.linear()
        .domain([d3.min(dataset2, function(d) {return d[0];}), d3.max(dataset2, function(d) {return d[0];})])
        .range([margin.left + barWidth/2, chartWidth - barWidth/2]);

      var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset2, function(d) {return d[1];})])
        .range([chartHeight, 0]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")

      svg.selectAll("rect")
        .data(dataset2)
        .enter()
        .append("rect")
        .attr("x", function(d) {return xScale(d[0]) - barWidth/2;})
        .attr("y", function(d) {return  yScale(d[1]);})
        .attr("width", barWidth)
        .attr("height", function(d) {return chartHeight - yScale(d[1]);})
        .attr("fill", function(d) {return (d[0] < hash["targetThreshold"]) ? "crimson" : "gold";});

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (chartHeight) + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ", 0)")
        .call(yAxis);

    }
  });
}
