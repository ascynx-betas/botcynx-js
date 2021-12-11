const { Message, Client } = require("discord.js");
const configmodel = require("../../models/config");
const mp = require("../../personal-modules/testfor");

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
    try {
      const fs = require("fs");
      var user = args[0];
      const type = "su";
      const guildId = message.guild.id;
      const guildc = await configmodel.find({
        guildId: guildId,
      });
      const config = guildc[0];
      var su = config.su;
      var logchannel = config.logchannel;
      if (!user || typeof user === "undefined") return;

      if (user.length == 21) {
        user = user.slice(2, user.length - 1);
      } else if (user.length == 22) {
        user = user.slice(3, user.length - 1);
      } else if (user.length == 18) {
      } else {
        return;
      }

      if (config.su.includes(user)) {
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $pull: { su: `${user}` } },
          function (err, doc) {
            if (err)
              return message.channel.send({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );
      } else {
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $addToSet: { su: `${user}` } },
          function (err, doc) {
            if (err)
              return message.channel.send({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );
      }
      if (su.includes(user)) {
        if (type === "su") {
          message.reply({
            content: `removed <@${user}> from the super user list of this guild`,
            allowedMentions: { parse: [] },
          });
        }
      } else {
        if (type === "su") {
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
      }
    } catch (err) {
      if (err) {
        const time = mp.getTimeOfDay();
        console.log(time, err);
      }
    }
  },
};
