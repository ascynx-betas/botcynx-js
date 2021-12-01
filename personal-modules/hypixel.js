let request = require("request");
const rp = require("request-promise");
const config = require("../config.json");
const key = config.hypixelapikey;
const fetch = require("node-fetch");

exports.getPlayerByUuid = function (uuid) {
  let Url = "https://api.hypixel.net/player?key=" + key + "&uuid=" + uuid;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
exports.getStatus = function (uuid) {
  let Url = "http://api.hypixel.net/status?key=" + key + "&uuid=" + uuid;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
exports.getKeyInformation = function () {
  let Url = "https://api.hypixel.net/key?key=" + key;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
exports.getProfile = async (uuid) =>
  (
    await fetchJSON(
      `https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`
    )
  ).profiles.sort(
    (a, b) => b.members[uuid].last_save - a.members[uuid].last_save
  )[0].members[uuid];
