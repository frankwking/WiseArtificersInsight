function arrayMean(ary) {
  var sum = 0;
  $.each(ary, function(index) {sum += ary[index]});
  return sum/ary.length;
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
