exports.dround = function (number, decimal) {
  let dfactor, result;
  if (decimal > 0) {
    dfactor = Math.pow(10, decimal);
    result = Math.round(number * dfactor) / dfactor;
  } else {
    dfactor = Math.abs(~decimal);
    dfactor = Math.pow(10, dfactor);
    result = number * dfactor;
    result = Math.round(result);
  }
  return result;
};
