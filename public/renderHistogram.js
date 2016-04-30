function renderHistogram(data, hash, theForm) {
  var margin = {top: 5, right: 25, bottom: 35, left: 55};
  var svgWidth = 830;
  var svgHeight = 380;
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

  $.each(dataset, function(index, item) {
    var sucGreaterOrEqual = 0;
    $.each(dataset, function(indexInterior, itemInterior) {if (item[0] <= itemInterior[0]) {sucGreaterOrEqual += itemInterior[1];}});
    item[2] = sucGreaterOrEqual;
  });

  d3.selectAll("svg > *").remove();

  var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var numBars = xMax - xMin;
  var barWidth = chartWidth / numBars - barPadding;
  if(barWidth < 1) {barWidth = 1}

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

  var stdDevBoxes = [[xScale(xMin) - barWidth, xScale(mean - stdDev) -xScale(xMin) + barWidth, "#737373"],
                    [xScale(mean - stdDev), xScale(mean) - xScale(mean - stdDev), "#999999"],
                    [xScale(mean), xScale(mean + stdDev) - xScale(mean), "#CCCCCC"],
                    [xScale(mean + stdDev), xScale(xMax) - xScale(mean + stdDev) + barWidth, "#f2f2f2"]];

  var stdDevLine = [xScale(mean - stdDev), xScale(mean), xScale(mean + stdDev)];

  var stdDevText = [[xScale(mean - stdDev), "-\u03C3"], [xScale(mean), "\u03BC"], [xScale(mean + stdDev),"+\u03C3"]];

  // Render Background standard deviation shading
  svg.selectAll("noHighlight")
    .data(stdDevBoxes)
    .enter()
    .append("rect")
    .attr("id", "stdDevShading")
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
    .attr("id", "stdDevLines")
    .attr("x1", function(d) {return d})
    .attr("x2", function(d) {return d})
    .attr("y1", yScale(yMax))
    .attr("y2", chartHeight)
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
      var tooltipText = ["n = " + d[0] + " successes",
                        d[1] + " trials with s = n successes",
                        (100*d[2]/theForm.elements.namedItem("numAttempts").value).toFixed(2) + "% trials s >= n",
                        (100*d[1]/theForm.elements.namedItem("numAttempts").value).toFixed(2) + "% trials s = n"];
      var xPosition = xScale(d[0]);
      var yPosition = 3*(chartHeight - yScale(yMax))/4;
      var tooltipWidth = 2+5*Math.max(tooltipText[0].length,tooltipText[1].length);
      var tooltipHeight = 48;
      svg.append("rect")
        .attr("id", "tooltipRect")
        .attr("class", "noHighlight")
        .attr("x", xPosition - tooltipWidth/2)
        .attr("y", yPosition - 11)
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("fill", "white");
      //render tooltip text
      var tblock = svg.append("text")
        .attr("id", "tooltipText")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px");
      tblock.append("tspan")
        .attr("x", (xPosition))
        .attr("y", yPosition)
        .text(tooltipText[0]);
      tblock.append("tspan")
        .attr("x", (xPosition))
        .attr("y", yPosition + 11)
        .text(tooltipText[1]);
      tblock.append("tspan")
        .attr("x", (xPosition))
        .attr("y", yPosition + 22)
        .text(tooltipText[2]);
      tblock.append("tspan")
        .attr("x", (xPosition))
        .attr("y", yPosition + 33)
        .text(tooltipText[3]);
     })
     .on("mouseout", function() {
      //Hide the tooltip
      d3.select("#tooltipText").remove();
      d3.select("#tooltipRect").remove();
     });

  // Render line annotations
  svg.selectAll("text")
    .data(stdDevText)
    .enter()
    .append("text")
    .attr("x", function(d) {return d[0] + 3})
    .attr("y", yScale(7*yMax/8))
    .attr("dy", "1em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text(function(d) {return d[1]});

  // Render bar color annotations
  svg.append("text")
    .attr("x", xScale(xMin))
    .attr("y", yScale(7*yMax/8))
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("fill", "red")
    .style("text-anchor", "start")
    .text("Red Bars: Failed Attempts");
  svg.append("text")
    .attr("x", xScale(xMin))
    .attr("y", yScale(7*yMax/8))
    .attr("dy", "-1em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("fill", "Gold")
    .style("text-anchor", "start")
    .text("Gold Bars: Successful Attempts");

  // Render X Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (chartHeight) + ")")
    .call(xAxis);

  // Render X Axis Label
  svg.append("text")
    .attr("transform", "translate(" + (chartWidth / 2) + " ," + (chartHeight + margin.bottom) + ")")
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Total Threshold Successes per Crafting Attempt");

  // Render Y Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (margin.left + barWidth/2) + ", 0)")
    .call(yAxis);

  // Render Y Axis Label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 )
    .attr("x", 0-chartHeight/2 )
    .attr("dy", "1em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Number of Crafting Attempts");
}
