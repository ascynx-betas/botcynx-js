const client = require("../index");
const configmodel = require("../models/config");
const mp = require("../personal-modules/testfor");

client.on("guildMemberUpdate", async (oldMember, newMember) => {

  let permissions = calc.permissions(Number(oldMember.guild.me.permissions));
  if (
    !permissions.includes("MANAGE_ROLES") &&
    !permissions.includes("ADMINISTRATOR")
  ) return;
    const guild = oldMember.guild;
    const config = await configmodel.find({
      guildId: guild.id,
    });

    let trigger = config[0].trigger;
    let removable = config[0].removable;
    let bypass = config[0].bypass;
    let logchannel = config[0].logchannel;

    const ora = oldMember._roles;
    const nra = newMember._roles;

    let orr = mp.compare(ora, trigger);
    let nrr = mp.compare(nra, trigger);

    // if oldMember doesn't have and newMember has a trigger role
    if (nrr === true && orr === false) {
      let diff = nra.filter((x) => !ora.includes(x));
      return client.channels.cache
        .get(logchannel)
        .send({
          content: `${oldMember.user.tag} now has trigger role <@&${diff[0]}>`,
          allowedMentions: { parse: [] },
        }).catch(() => null)
    }
    // if oldMember has and newMember doesn't have a trigger role
    if (orr === true && nrr === false) {
      let diff = ora.filter((x) => !nra.includes(x));
      client.channels.cache
        .get(logchannel)
        .send({
          content: `${newMember.user.tag} lost trigger role <@&${diff[0]}>`,
          allowedMentions: { parse: [] },
        }).catch(() => null)
      // fuse trigger into bypass then check for them bypass roles
      bypass = bypass.concat(trigger);
      let e = mp.compare(nra, bypass);
      if (e !== false) return;
      // doesn't have any bypasses / triggers that can stop anymore :thumbsup:
      rd = nra.filter((x) => removable.includes(x));
      rd.forEach(function (removable) {
        newMember.roles.remove(removable);
        client.channels.cache
          .get(logchannel)
          .send({
            content: `removed <@&${removable}> from ${newMember.user.tag}`,
            allowedMentions: { parse: [] },
          }).catch(() => null)
      });
    }
});
