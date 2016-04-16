function renderHistogram(data, hash, theForm) {
  var margin = {top: 5, right: 20, bottom: 20, left: 30};
  var svgWidth = 750;
  var svgHeight = 500;
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var barPadding = 2;

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
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

  var stdDevBoxes = [[xScale(xMin) - barWidth, xScale(mean - stdDev) -xScale(xMin) + barWidth, "dimgrey"],
                    [xScale(mean - stdDev), xScale(mean) - xScale(mean - stdDev), "darkgrey"],
                    [xScale(mean), xScale(mean + stdDev) - xScale(mean), "lightgrey"],
                    [xScale(mean + stdDev), xScale(xMax) - xScale(mean + stdDev) + barWidth, "gainsboro"]];

  var stdDevLine = [xScale(mean - stdDev), xScale(mean), xScale(mean + stdDev)];

  var stdDevText = [[xScale(mean - stdDev), "-\u03C3"], [xScale(mean), "\u03BC"], [xScale(mean + stdDev),"+\u03C3"]];

  // Render Background standard deviation shading
  svg.selectAll("noHighlight")
    .data(stdDevBoxes)
    .enter()
    .append("rect")
    .attr("class", "noHighlight")
    .attr("x", function(d) {return d[0]})
    .attr("y", yScale(yMax))
    .attr("width", function(d) {return d[1]})
    .attr("height", chartHeight - yScale(yMax))
    .attr("fill", function(d) {return d[2]});

  // Render mean, +/- stdDev lines
  svg.selectAll("line")
    .data(stdDevLine)
    .enter()
    .append("line")
    .attr("x1", function(d) {return d})
    .attr("x2", function(d) {return d})
    .attr("y1", yScale(yMax))
    .attr("y2", yScale(yMin))
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  // Render Histogram
  svg.selectAll("histogramBars")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "histogramBars")
    .attr("x", function(d) {return xScale(d[0]) - barWidth/2;})
    .attr("y", function(d) {return  yScale(d[1]);})
    .attr("width", barWidth)
    .attr("height", function(d) {return chartHeight - yScale(d[1]);})
    .attr("fill", function(d) {return (d[0] < hash["targetThreshold"]) ? "crimson" : "gold";})
    .on("mouseover", function(d) {
      //Get this bar's x/y values, then augment for the tooltip
      var xPosition = xScale(d[0]);
      var yPosition = 3*(chartHeight - yScale(yMax))/4;
      //Update the tooltip position and value
      d3.select("#tooltip")
        .style("left", (xPosition + barWidth) + "px")
        .style("top", yPosition + "px")
        .select("#tooltipValue")
        .text(d[1] + " trials with " + d[0] + " successes\n" + (100*d[1]/theForm.elements.namedItem("numAttempts").value).toFixed(1) + "% of all trials");
      //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);
     })
     .on("mouseout", function() {
      //Hide the tooltip
      d3.select("#tooltip").classed("hidden", true);
     });

  // Render line annotations
  svg.selectAll("text")
    .data(stdDevText)
    .enter()
    .append("text")
    .text(function(d) {return d[1]})
    .attr("x", function(d) {return d[0] + 3})
    .attr("y", yScale(yMax-15))
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black");

  // Render X Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (chartHeight) + ")")
    .call(xAxis);

  // Render Y Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (margin.left + barWidth/2) + ", 0)")
    .call(yAxis);
}
