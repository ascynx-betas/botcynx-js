exports.testfor = function (disabledarray, testvalue) {
  //test for errors
  if (typeof disabledarray !== "object") throw "wrong variable type";
  if (typeof testvalue !== "string") throw "wrong variable type";
  if (!testvalue || !disabledarray) throw "missing variable";
  //variables
  let testedvalue = 0;
  let success;

  //function itself
  do {
    if (testvalue.includes(disabledarray[testedvalue])) {
      success = true;
      break;
    } else {
      testedvalue++;
    }
  } while (testedvalue != disabledarray.length);
  if (testedvalue == disabledarray.length && success != true) {
    success = false;
  }
  return success;
};

exports.compare = function (array1, array2) {
  if (typeof array1 !== "object") throw "parameter 1 is wrong variable type";
  if (typeof array2 !== "object") throw "parameter 2 is wrong variable type";
  if (!array1 || !array2) throw "missing variable";
  //var
  let success;

  array1.forEach(function (array1) {
    let testedvalue = 0;
    do {
      if (array1 == array2[testedvalue]) {
        success = true;
        break;
      } else {
        testedvalue++;
      }
    } while (testedvalue != array2.length);
  });

  if (success != true) {
    success = false;
  }
  return success;
};
exports.ct = function (array1, array2) {
  if (typeof array1 !== "object") throw "parameter 1 is wrong variable type";
  if (typeof array2 !== "object") throw "parameter 2 is wrong variable type";
  if (!array1 || !array2) throw "missing variable";

  let success;
  let breakingpoint = [];
  let result;
  array1.forEach(function (array1) {
    let testedvalue = 0;
    do {
      if (array1 == array2[testedvalue]) {
        success = true;
        breakingpoint.push(array2[testedvalue]);
        break;
      } else {
        testedvalue++;
      }
    } while (testedvalue != array2.length);
  });

  let breakingcount = breakingpoint.length;
  if (success != true) {
    success = false;
    result = { success: success };
  } else {
    result = { success: success, breakingcount: breakingcount };
  }
  return result;
};

exports.getTimeOfDay = function () {
  let event = Date.now();
  let d = new Date(event);
  let sd = d.toTimeString();
  let fields = sd.split(" ");
  let time = fields[0];

  return time;
};
exports.e2r = function (timestamp) {
  let d = new Date(timestamp);
  let sd = d.toTimeString();
  let fields = sd.split(" ");
  let time = fields[0];

  return time;
};
exports.getTime = function () {
  let event = Date.now();
  let d = new Date(event);
  let sd = d.toDateString();

  return sd;
};

exports.b2a = function (a) {
  var c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    o,
    b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    k = 0,
    l = 0,
    m = "",
    n = [];
  if (!a) return a;
  do
    (c = a.charCodeAt(k++)),
      (d = a.charCodeAt(k++)),
      (e = a.charCodeAt(k++)),
      (j = (c << 16) | (d << 8) | e),
      (f = 63 & (j >> 18)),
      (g = 63 & (j >> 12)),
      (h = 63 & (j >> 6)),
      (i = 63 & j),
      (n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i));
  while (k < a.length);
  return (
    (m = n.join("")),
    (o = a.length % 3),
    (o ? m.slice(0, o - 3) : m) + "===".slice(o || 3)
  );
};

exports.a2b = function (a) {
  var b,
    c,
    d,
    e = {},
    f = 0,
    g = 0,
    h = "",
    i = String.fromCharCode,
    j = a.length;
  for (b = 0; 64 > b; b++)
    e[
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
        b
      )
    ] = b;
  for (c = 0; j > c; c++)
    for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; )
      ((d = 255 & (f >>> (g -= 8))) || j - 2 > c) && (h += i(d));
  return h;
};
exports.isLink = function (potentiallink) {
  let http = /http:\/\/./;
  let https = /https:\/\/./;

  let r1 = http.test(potentiallink);
  let r2 = https.test(potentiallink);
  if (r1 == true || r2 == true) {
    return true;
  } else return false;
};
/**
 * @param  {} message
 */
exports.containsLink = function (message) {
  const mp = require("./testfor");
  let fields = message.split(" ");
  let result;
  let arrayofresults = [];
  fields.forEach(function (fields, index) {
    result = mp.isLink(fields);
    if (result == true) {
      arrayofresults.push(index);
    }
  });

  return arrayofresults;
};
