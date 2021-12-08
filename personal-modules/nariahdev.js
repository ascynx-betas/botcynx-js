let request = require("request");
const rp = require("request-promise");
const config = require("../config.json");
const key = config.hypixelapikey;
const hypixel = require("./hypixel");
const fetch = require("node-fetch");

//do not do a direct call of this function except if you send the data

exports.fetchNetworth = async function (data) {
  const url = `https://nariah-dev.com/api/networth/categories`;

  const resp = await fetch(url, {
    method: "POST",
    body: data,
  }).catch((err) => console.log(err));
  const json = await resp.text();
  return Response.send(json);
};
