const { Message, Client } = require("discord.js");

module.exports = {
  name: "super-user",
  aliases: ["su"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fs = require("fs");
    var user = args[0];
    const type = "su";
    const guildId = message.guild.id;
    const guildconfig = require(`../../guild-only/${guildId}/config`);
    const editvalue = 0;
    const name = guildconfig.name;
    const verifyrole = guildconfig.verify;
    var su = guildconfig.su;
    var logchannel = guildconfig.logchannel;
    var test = 0;
    var removablespliced = [];
    var bypassspliced = [];
    var triggerspliced = [];
    var success = false;
    var suspliced = [];
    var fullitem;
    if (!user || typeof user === "undefined") return;

    var bypass = guildconfig.bypass;
    var removable = guildconfig.removable;
    var trigger = guildconfig.trigger;

    if (user.length == 21) {
      user = user.slice(2, user.length - 1);
    } else if (user.length == 22) {
      user = user.slice(3, user.length - 1);
    } else if (user.length == 18) {
    } else {
      return;
    }
    if (su.includes(user)) {
      if (type === "su") {
        const index = su.indexOf(user);
        su.splice(index, 1);
        var successful = true;

        message.reply({
          content: `removed <@${user}> from the super user list of this guild`,
          allowedMentions: { parse: [] },
        });
      }
    } else {
      if (type === "su") {
        su.splice(0, 0, user);
        var successful = true;

        message.channel
          .send({
            content: `adding <@${user}> as super user`,
            allowedMentions: { parse: [] },
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else {
        message.channel
          .send({ content: `argument type not supported` })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
        var successful = false;
      }
    }

    if (successful === true) {
      if (removable.length > 1) {
        removable.forEach(function (removable) {
          var removablesplice = `"${removable}"`;
          removablespliced.splice(test, test, removablesplice);
          test += 1;
          return removablespliced;
        });
      } else {
        var removablespliced = `"${removable}"`;
      }
      test = 0;
      if (bypass.length > 1) {
        bypass.forEach(function (bypass) {
          var bypasssplice = `"${bypass}"`;
          bypassspliced.splice(test, test, bypasssplice);
          test += 1;
          return bypassspliced;
        });
      } else {
        var bypassspliced = `"${bypass}"`;
      }
      test = 0;
      if (trigger.length > 1) {
        trigger.forEach(function (trigger) {
          var triggersplice = `"${trigger}"`;
          triggerspliced.splice(test, test, triggersplice);
          test += 1;
          return triggerspliced;
        });
      } else {
        var triggerspliced = `"${trigger}"`;
      }

      test = 0;
      if (su.length > 1) {
        su.forEach(function (su) {
          var susplice = `"${su}"`;
          suspliced.splice(test, test, susplice);
          test += 1;
          return suspliced;
        });
      } else {
        var suspliced = `"${su}"`;
      }
      if (typeof verifyrole !== "undefined") {
        var fullitem = `{
  "name": "${name}",
  "guildId": "${guildId}",
  "trigger": [${triggerspliced}],
  "bypass": [${bypassspliced}],
  "removable": [${removablespliced}],
  "logchannel": "${logchannel}",
  "su": [${suspliced}],
  "verify": "${verifyrole}"
}`;
      } else {
        var fullitem = `{
          "name": "${name}",
          "guildId": "${guildId}",
          "trigger": [${triggerspliced}],
          "bypass": [${bypassspliced}],
          "removable": [${removablespliced}],
          "logchannel": "${logchannel}",
          "su": [${suspliced}]
      }`;
      }

      success = true;
      fs.writeFile(
        `guild-only/${guildId}/config.json`,
        fullitem,
        function (err) {
          if (err) {
            console.log(err);
            success = false;
          }
          if (success === true) {
            message.channel
              .send("successfully changed")
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          } else {
            message.channel
              .send("failed to edit")
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          }
        }
      );
    }
    if (logchannel == " ") {
      client.channels.cache
        .get(logchannel)
        .send({
          content: `config has been modified by \`\`${message.user.tag}\`\``,
          allowedMentions: { parse: [] },
        })
        .catch(() =>
          console.log(
            `I don't have permission to send a message in ${channel} in ${guild.name}`
          )
        );
    }
  },
};
