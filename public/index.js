function fetchResultsJS(theForm,event) {
  event.preventDefault();

  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute", "stuntDice", "stuntSuccesses", "numAttempts", "terminus", "targetThreshold", "essence"];
  var formBooleanArray = ["craftSpeciality", "fullExcellency", "willpowerSpend", "flawlessHandiworkMethod", "flawlessHandiworkRepurchase"];

  var returnFloatArray = ["meanSuc", "stdDevSuc", "percentSuc"];
  var returnIntegerArray = ["medianSuc","initialPoolSize"];

  var margin = {top: 5, right: 20, bottom: 20, left: 30};
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
      $.each(data.hist, function(index, item) {dataset.push([parseInt(index), item])});
      var mean = data.meanSuc;
      var stdDev = data.stdDevSuc;
      var xMin = d3.min(dataset, function(d) {return d[0];});
      var xMax = d3.max(dataset, function(d) {return d[0];});
      var yMin = d3.min(dataset, function(d) {return d[1];});
      var yMax = d3.max(dataset, function(d) {return d[1];});

      d3.selectAll("svg > *").remove();

      var svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

      var numBars = xMax - xMin;
      var barWidth = chartWidth / numBars - barPadding;

      var xScale = d3.scale.linear()
        .domain([xMin-1, xMax+1])
        .range([margin.left + barWidth/2, chartWidth - barWidth/2]);

      var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([chartHeight, margin.top]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")

        console.log(yScale(0))
        console.log(chartHeight - yScale(0))
      svg.append("rect")
        .attr("x", xScale(xMin) - barWidth)
        .attr("y", yScale(yMax))
        .attr("width", xScale(mean - stdDev) -xScale(xMin) + barWidth)
        .attr("height", chartHeight - yScale(yMax))
        .attr("fill", "dimgrey");

      svg.append("rect")
        .attr("x", xScale(mean - stdDev))
        .attr("y", yScale(yMax))
        .attr("width", xScale(mean) - xScale(mean - stdDev))
        .attr("height", chartHeight - yScale(yMax))
        .attr("fill", "darkgrey");

      svg.append("rect")
        .attr("x", xScale(mean))
        .attr("y", yScale(yMax))
        .attr("width", xScale(mean + stdDev) - xScale(mean))
        .attr("height", chartHeight - yScale(yMax))
        .attr("fill", "lightgrey");

      svg.append("rect")
        .attr("x", xScale(mean + stdDev))
        .attr("y", yScale(yMax))
        .attr("width", xScale(xMax) - xScale(mean + stdDev) + barWidth)
        .attr("height", chartHeight - yScale(yMax))
        .attr("fill", "gainsboro");

      svg.selectAll("rect")
        .data(dataset)
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
        .attr("transform", "translate(" + (margin.left + barWidth/2) + ", 0)")
        .call(yAxis);
    }
  });
}
