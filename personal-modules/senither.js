let request = require("request");
const rp = require("request-promise");
const config = require("../config.json");
const key = config.hypixelapikey;

exports.getProfiles = function (uuid) {
  const options = {
    url: `https://hypixel-api.senither.com/v1/profiles/${uuid}`,
    headers: {
      Authorization: `${key}`,
    },
  };
  return rp(options).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};

exports.getFatterProfile = function (uuid) {
  const options = {
    url: `https://hypixel-api.senither.com/v1/profiles/${uuid}/weight`,
    headers: {
      Authorization: `${key}`,
    },
  };
  return rp(options).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};

exports.getSpecifiedProfile = async function (uuid, profile) {
  const options = {
    url: `https://hypixel-api.senither.com/v1/profiles/${uuid}/${profile}`,
    headers: {
      Authorization: `${key}`,
    },
  };
  const body = await rp(options);
  let data = JSON.parse(body);
  return data;
};
