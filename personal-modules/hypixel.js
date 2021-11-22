var request = require("request");
const rp = require("request-promise");
const config = require("../config.json");
const key = config.hypixelapikey;

exports.getPlayerByUuid = function (uuid) {
  var Url = "https://api.hypixel.net/player?key=" + key + "&uuid=" + uuid;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
exports.getStatus = function (uuid) {
  var Url = "http://api.hypixel.net/status?key=" + key + "&uuid=" + uuid;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
exports.getKeyInformation = function () {
  var Url = "https://api.hypixel.net/key?key=" + key;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
