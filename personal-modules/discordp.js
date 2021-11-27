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
