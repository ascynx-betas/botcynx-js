const mp = require("./testfor");

exports.permOverride = async function (permissionlist) {
  if (typeof permissionlist !== "object")
    throw `TypeError: cannot read ${typeof permissionlist}`;
  if (!permissionlist) throw `TypeError: Missing variable`;

  let permlist = [];
  let denied = [];
  let allowed = [];

  permissionlist.forEach(function (permissionlist) {
    if (permissionlist.type === "member") {
      permlist.push(`<@${permissionlist.id}>`);
      denied.push(permissionlist.deny.bitfield);
      allowed.push(permissionlist.allow.bitfield);
      return permlist, denied, allowed;
    }
  });
  let result = { permlist: permlist, denied: denied, allowed: allowed };
  return result;
};
exports.isId = function (potentialId) {
  let allowed = /^[0-9]+$/;
  if (typeof potentialId !== "string") return Error(`is not a String`);
  if (
    potentialId.length != 18 &&
    potentialId.length != 22 &&
    potentialId.length != 21
  )
    return false;
  if (potentialId.length == 22) {
    potentialId.slice(3, potentialId.length - 1);
  } else if (potentialId.length == 21) {
    potentialId.slice(2, potentialId.length - 1);
  }

  if (!allowed.test(potentialId)) return false;
  return true;
};
