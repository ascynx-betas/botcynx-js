const client = require("../index");
const configmodel = require("../models/config");

//to rewrite

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    var newbypasscheck = 0;
    var bypasscheck = 0;
    var newtriggercheck = 2;
    var guild = oldMember.guild;
    var guildcache = oldMember.roles.guild.id;

    const cachedconfig = await configmodel.find({
      guildId: guildcache,
    });

    if (!cachedconfig || cachedconfig.length == 0) {
      new configmodel({
        name: guild.name,
        guildId: guildcache,
        trigger: [],
        bypass: [],
        removable: [],
        logchannel: "",
        su: [],
      }).save();
      return;
    }
    const config = cachedconfig[0];
    var trigger = config.trigger;
    var channel = config.logchannel;
    var bypass = config.bypass;
    var removable = config.removable;
    if (!trigger || typeof trigger === "undefined" || trigger.length == 0) {
      return;
    }
    //could probably use a var bypass = bypass.concat(trigger) to add the triggers to bypasses
    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      trigger.forEach(function (trigger) {
        if (
          !oldMember.roles.cache.has(trigger) &&
          newMember.roles.cache.has(trigger)
        ) {
          if (channel.length >= 1) {
            client.channels.cache
              .get(channel)
              .send({
                content: `${newMember.user.tag} now has <@&${trigger}>`,
                allowedMentions: { parse: [] },
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          }
        }
        if (
          oldMember.roles.cache.has(trigger) &&
          !newMember.roles.cache.has(trigger)
        ) {
          if (channel.length >= 1) {
            client.channels.cache
              .get(channel)
              .send({
                content: `${newMember.user.tag} lost <@&${trigger}>`,
                allowedMentions: { parse: [] },
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name} `
                )
              );
          }
          if (newMember.roles.cache.has(trigger)) {
            newtriggercheck = 1;
          }
          if (!newMember.roles.cache.has(trigger)) {
            newtriggercheck = 0;
          }

          bypass.forEach(function (bypass) {
            if (newMember.roles.cache.has(bypass)) {
              bypasscheck = 1;
              newbypasscheck = bypasscheck || 0;
            }
          });

          if (newbypasscheck === 0 && newtriggercheck === 0) {
            removable.forEach(function (removable) {
              if (newMember.roles.cache.has(removable)) {
                newMember.roles
                  .remove(removable)
                  .catch(() =>
                    console.log(
                      `I don't have permission to remove ${removable} in ${guildcache}`
                    )
                  );
                if (channel.length >= 1) {
                  client.channels.cache
                    .get(channel)
                    .send({
                      content: `<@&${removable}> was removed from ${newMember.user.tag}`,
                      allowedMentions: { parse: [] },
                    })
                    .catch(() =>
                      console.log(
                        `I don't have permission to send a message in ${channel} in ${guild.name}`
                      )
                    );
                }
              }
            });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
