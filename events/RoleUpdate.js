const client = require("../index");
const configmodel = require("../models/config");
const mp = require("../personal-modules/testfor");

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
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

    let orr = mp.ct(ora, trigger); //error here, if you have multiple triggers it won't work
    let nrr = mp.ct(nra, trigger); //same here
    // if oldMember doesn't have and newMember has a trigger role
    if (orr.breakingcount < nrr.breakingcount || typeof orr.breakingcount === 'undefined' && nrr.breakingcount > 0) {
      let diff = nra.filter((x) => !ora.includes(x));
      return client.channels.cache
        .get(logchannel)
        .send({
          content: `${oldMember.user.tag} now has trigger role <@&${diff[0]}>`,
          allowedMentions: { parse: [] },
        });
    }
    // if oldMember has and newMember doesn't have a trigger role
    if (orr.breakingcount > nrr.breakingcount|| typeof nrr.breakingcount === 'undefined' && orr.breakingcount > 0) {
      let diff = ora.filter((x) => !nra.includes(x));
      client.channels.cache
        .get(logchannel)
        .send({
          content: `${newMember.user.tag} lost trigger role <@&${diff[0]}>`,
          allowedMentions: { parse: [] },
        });
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
          });
      });
    }
  } catch (err) {
    if (err) return console.log(err);
  }
});
