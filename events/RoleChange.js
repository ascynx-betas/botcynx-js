const client = require("../index");
const fs = require("fs");
const givecheck = false; // that's how  to enable the legacy system

//currently searching for a way to get the guildId to get from a certain folder, this is pain // found how

client.on("guildMemberUpdate", (oldMember, newMember) => {
  try {
    let newbypasscheck = 0;
    let bypasscheck = 0;
    let newtriggercheck = 2;

    let guild = oldMember.guild;
    let guildcache = oldMember.roles.guild.id;

    const cachedconfig = require(`../guild-only/${guildcache}/config.json`);

    let trigger = cachedconfig.trigger;
    let channel = cachedconfig.logchannel;
    let bypass = cachedconfig.bypass;
    let removable = cachedconfig.removable;

    if (givecheck === true) {
      if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        removable.forEach(function (removable) {
          if (
            !oldMember.roles.cache.has(removable) &&
            newMember.roles.cache.has(removable)
          ) {
            bypass.forEach(function (bypass) {
              if (newMember.roles.cache.has(bypass)) {
                let bypasscheck = 1;
                newbypasscheck = 0;
                console.log(bypasscheck);
              }
            });
            trigger.forEach(function (trigger) {
              if (newMember.roles.cache.has(trigger)) {
                newtriggercheck = 1;
              }
              if (!newMember.roles.cache.has(trigger)) {
                newtriggercheck = 0;
              }
            });
          }
        });
        removable.forEach(function (removable) {
          if (newbypasscheck === 0 && newtriggercheck === 0) {
            if (newMember.roles.cache.has(removable)) {
              newMember.roles
                .remove(removable)
                .catch(() =>
                  console.log(
                    `I don't have permission to remove ${removable} in ${guildcache}`
                  )
                );
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

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      trigger.forEach(function (trigger) {
        if (
          !oldMember.roles.cache.has(trigger) &&
          newMember.roles.cache.has(trigger)
        ) {
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
        if (
          oldMember.roles.cache.has(trigger) &&
          !newMember.roles.cache.has(trigger)
        ) {
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
            });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
