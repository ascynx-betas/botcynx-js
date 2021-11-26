exports.permOverride = async function (permissionlist) {
  if (typeof permissionlist !== "object") throw "wrong variable type";
  if (!permissionlist) throw "missing variable";

  let permlist = [];
  let denied = [];
  let allowed = [];

  permissionlist.forEach(function (permissionlist) {
    if (permissionlist.type === "member") {
      console.log(permissionlist.allow.bitfield, permissionlist.deny.bitfield);
      permlist.splice(0, 0, `${permissionlist.id}`);
      denied.splice(0, 0, permissionlist.deny.bitfield);
      allowed.splice(0, 0, permissionlist.allow.bitfield);
      return permlist, denied, allowed;
    }
  });
  let result = { permlist: permlist, denied: denied, allowed: allowed };
  return result;
};
