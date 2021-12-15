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
  let allowed = /^[0-9]+$/g;
  let test = /[^[0-9]/gi;
  if (typeof potentialId !== "string") return Error(`is not a String`);
  let atest = potentialId.replace(test, "");
  potentialId = atest;
  if (potentialId.length != 18) return false;

  if (!allowed.test(potentialId)) return false;
  return true;
};
exports.isInvite = function (potentialInvite) {
  if (typeof potentialInvite !== "string") return Error(`is not a string`);
  let invite =
    /.discord\.gg\/.+$|.discord\.com\/invite\/.+$|.discordapp\.com\/+$/gim;
  if (!invite.test(potentialInvite)) return false;
  return true;
};
exports.webhook = function (webhooklink) {
  link = webhooklink;
  link = link.slice(8, link.length);
  let fields = link.split("/");
  if (fields[2] != "webhooks") return;
  const wbtoken = fields[4];
  const wbid = fields[3];
  return { id: wbid, token: wbtoken };
};
