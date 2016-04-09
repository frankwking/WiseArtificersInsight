function arrayMean(ary) {
  var sum = 0;
  $.each(ary, function(index) {sum += ary[index]});
  return sum/ary.length;
}
