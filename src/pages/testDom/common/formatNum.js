function formatNum (strNum) {
  if (strNum.length <= 3) {
    return strNum;
  }
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
    return strNum;
  }
  let a = RegExp.$1;
  let b = RegExp.$2;
  let c = RegExp.$3;
  let re = new RegExp();
  re.compile('(\\d)(\\d{3})(,|$)');
  while (re.test(b)) {
    b = b.replace(re, '$1,$2$3');
  }
  return a + '' + b + '' + c;
}

export default formatNum;
