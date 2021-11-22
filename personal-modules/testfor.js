exports.testfor = function (disabledarray, testvalue) {
  //test for errors
  if (typeof disabledarray !== "object") throw "wrong variable type";
  if (typeof testvalue !== "string") throw "wrong variable type";
  if (!testvalue || !disabledarray) throw "missing variable";
  //variables
  var testedvalue = 0;
  var success;

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
  var success;

  array1.forEach(function (array1) {
    var testedvalue = 0;
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
