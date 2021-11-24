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
      testedvalue += 1;
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
        testedvalue += 1;
      }
    } while (testedvalue != array2.length);
  });

  if (success != true) {
    success = false;
  }
  return success;
};

exports.getTimeOfDay = function () {
  let event = Date.now();
  let d = new Date(event);
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

exports.Errorlog = function (err) {
  const time = getTimeOfDay();
  console.log(`[${time}] ${err}`);

  return;
};
