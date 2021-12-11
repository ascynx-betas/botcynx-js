let request = require("request");
const rp = require("request-promise");

//https://api.mojang.com/users/profiles/minecraft/${ign} seems like it only accepts full caps

exports.getUuidbyUsername = function (ign) {
  ign = ign.toUpperCase();
  let Url = `https://api.mojang.com/users/profiles/minecraft/${ign}`;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
/**
 * returns
 * name: username // String
 * id: uuid // String
 */
exports.getProfilebyUuid = function (uuid) {
  let Url = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;

  return rp(Url).then((body) => {
    let data = JSON.parse(body);
    return data;
  });
};
/**
 * returns
 * id: uuid of the account // String
 * name: account username //String
 * properties: [{
 * name: textures //const String
 * value: rest of account information in a BASE64 encoded string //String
 * }] // array
 * legacy: true // only appears if account is legacy //String
 */
/**
 * when value is decoded it returns:
 *
 * timestamp: when the request was sent //number
 * preofileId: uuid of account //String
 * profileName: username of account //String
 * textures: {
 * SKIN: {
 * url: the link of the texture of the minecraft account's skin
 * metadata: {
 * model: slim (alex) or classic (steve)
 *    } //object
 *  } //object
 * } //object
 * CAPE: {
 * url: cape url   //String
 * } //object will not appear if account doesn't have a cape
 */
