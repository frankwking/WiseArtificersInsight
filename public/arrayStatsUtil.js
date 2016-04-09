function arrayMean(ary) {
  var sum = 0;
  $.each(ary, function(index) {sum += ary[index]});
  return sum/ary.length;
}

function arrayMedian(ary) {
  ary.sort(function(a, b){return a-b});
  var half = Math.floor(ary.length/2);
  if (ary.length % 2) {
    return ary[half];
  } else {
    return (ary[half-1] + ary[half]) / 2.0;
  }
}

function arrayHistogram(ary) {
  var hist = {};
  $.each(ary, function(index) {hist[ary[index]] = hist[ary[index]]+1 || 1});
  return hist;
}

function arrayVariance(ary) {
  var mean = arrayMean(ary);
  var variance = 0;
  $.each(ary, function(index) {variance += Math.pow(ary[index] - mean,2)});
  return variance/ary.length;
}

function arrayStdDev(ary) {
  return Math.sqrt(arrayVariance(ary));
}

function arrayPercentAboveThreshold(ary, threshold) {
  var count = 0;
  $.each(ary, function(index) {
    if (ary[index] > threshold) {
      count += 1;
    }
  });
  return count/ary.length;
}
