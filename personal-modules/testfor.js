exports.testfor = function(disabledarray, testvalue) {
    //test for errors
    if (typeof disabledarray !== 'object') throw 'wrong variable type'
    if (typeof testvalue !== 'string') throw 'wrong variable type'
    if (!testvalue || !disabledarray) throw 'missing variable'
//variables
    var testedvalue = 0;
var success;

//function itself
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
