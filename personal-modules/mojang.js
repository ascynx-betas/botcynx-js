var request = require("request");
const rp = require("request-promise");

//https://api.mojang.com/users/profiles/minecraft/${ign} seems like it only accepts full caps

exports.getUuidbyUsername = function (ign) {
  ign = ign.toUpperCase();
  var Url = `https://api.mojang.com/users/profiles/minecraft/${ign}`;

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
