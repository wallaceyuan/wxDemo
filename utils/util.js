function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function predict(n) {
  var str = "",
    range = n,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return parseInt(str);
}

module.exports = {
  predict:predict
}

