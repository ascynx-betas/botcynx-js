exports.testfor = function(disabledarray, testvalue) {
var testedvalue = 0;
var success;

do {
    if(testvalue.includes(disabledarray[testedvalue])) {
        success = true;
        break
    } else {
        testedvalue += 1;
    }
} while (testedvalue != disabledarray.length)
if (testedvalue == disabledarray.length && success != true) {
    success = false;
}
return success;
}
