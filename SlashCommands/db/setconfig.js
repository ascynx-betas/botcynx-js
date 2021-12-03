const { Command } = require("reconlx");
const configmodel = require("../../models/config");

module.exports = new Command({
  name: "setconfig",
  description: "store a certain role for uses in the bot",
  userPermissions: ["MANAGE_ROLES"],
  devonly: true,
  options: [
    {
      name: "type",
      description: "the type of role to add",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "trigger",
          value: "trigger",
        },
        {
          name: "removable",
          value: "removable",
        },
        {
          name: "bypass",
          value: "bypass",
        },
        {
          name: "logchannel",
          value: "logchannel",
        },
        {
          name: "blocked channel",
          value: "blockchannel",
        },
      ],
    },
    {
      name: "role",
      description: "role to add",
      type: "ROLE",
      required: false,
    },
    {
      name: "channel",
      description: "only used for setting logchannel",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: false,
    },
  ],

  run: async ({ client, interaction }) => {
    try {
      const role = interaction.options.getRole("role");
      const type = interaction.options.getString("type");
      const channel = interaction.options.getChannel("channel");
      const guild = interaction.guild;
      const guildId = interaction.guild.id;

      let guildconfig = await configmodel.find({
        guildId: guildId,
      });

      if (!guildconfig || guildconfig.length == 0) {
        new configmodel({
          name: guild.name,
          guildId: guildId,
          trigger: [],
          bypass: [],
          removable: [],
          logchannel: "",
          su: [],
          blocked: [],
        }).save();
        return interaction.followUp({
          content: `configuration was missing, please re-use the command`,
        });
      }
      const config = guildconfig[0];
      const log = config.logchannel;

      if (type === "bypass") {
        const roleId = role.id;
        if (guildconfig.bypass) {
          if (guildconfig.bypass.includes(roleId))
            return interaction.reply({
              content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
            });
        }
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $addToSet: { bypass: `${roleId}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `${role} has been added to ${type}`,
            allowedMentions: { parse: [] },
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else if (type === "trigger") {
        const roleId = role.id;
        if (guildconfig.trigger) {
          if (guildconfig.trigger.includes(roleId))
            return interaction.reply({
              content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
            });
        }
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $addToSet: { trigger: `${roleId}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `${role} has been added to ${type}`,
            allowedMentions: { parse: [] },
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else if (type === "removable") {
        const roleId = role.id;
        if (guildconfig.removable) {
          if (guildconfig.removable.includes(roleId))
            return interaction.reply({
              content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
            });
        }
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $addToSet: { removable: `${roleId}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `${role} has been added to ${type}`,
            allowedMentions: { parse: [] },
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else if (type === "logchannel") {
        let logchannel = channel.id;
        if (guildconfig.logchannel == `${logchannel}`)
          return interaction.reply({
            content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
          });

        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $set: { logchannel: `${logchannel}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .editReply({
            content: `${type} is now <#${logchannel}>\nmodifications after this one will also be logged there`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else if (type === "blockchannel") {
        let blockchannel = channel.id;
        if (guildconfig.blocked) {
          if (guildconfig.blocked.includes(blockchannel))
            return interaction.reply({ content: `channel is already blocked` });
        }

        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $addToSet: { blocked: `${blockchannel}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `${type} now contains <#${blockchannel}>\na channel blocked means that any person to use the bot's link reader on a link leading to a message in this channel will be ignored`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else {
        interaction
          .followUp({ content: `argument type not supported` })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      }
      if (log) {
        client.channels.cache.get(log).send({
          content: `configuration was modified by \`\`${interaction.user.tag}\`\`\nthe changes may take a few minutes for them to take effect`,
        });
      }
    } catch (err) {
      console.log(err);
      interaction
        .editReply({ content: `there was an error executing this command` })
        .catch(() =>
          console.log(
            `I don't have permission to send a message in ${channel} in ${guild.name}`
          )
        );
    }
  },
});
