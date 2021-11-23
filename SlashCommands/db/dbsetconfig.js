const { Command } = require("reconlx");
const configmodel = require("../../models/config");

module.exports = new Command({
  name: "devsetconfig",
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
      const editvalue = 0;
      var test = 0;
      var removablespliced = [];
      var bypassspliced = [];
      var triggerspliced = [];
      var success = false;
      var suspliced = [];
      var fullitem;

      const guildconfig = await configmodel.find({
        guildId: guildId,
      });
      console.log(guildconfig);

      if (!guildconfig || guildconfig.length == 0) {
        new configmodel({
          name: guild.name,
          guildId: guildId,
          trigger: [""],
          bypass: [""],
          removable: [""],
          logchannel: "",
          su: [""],
        }).save();
        return interaction.followUp({
          content: `configuration was missing, please re-use the command`,
        });
      }

      const verifyrole = guildconfig.verify;
      var logchannel = guildconfig.logchannel;
      var bypass = guildconfig.bypass;
      var removable = guildconfig.removable;
      var trigger = guildconfig.trigger;

      interaction
        .followUp({ content: `starting interaction` })
        .catch(() =>
          console.log(
            `I don't have permission to send a message in ${channel} in ${guild.name}`
          )
        );
      if (type === "bypass") {
        const roleId = role.id;
        if (bypass) {
          if (guildconfig.bypass.includes(roleId))
            return interaction.reply({
              content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
            });
        }
        var bypass = guildconfig.bypass;
        configmodel.updateOne(
          { guildId: `${guildId}` },
          {
            $addToSet: { bypass: `${roleId}` },
            function(err, doc) {
              if (err) {
                console.log(err);
                return interaction.followUp({
                  content: `there was an error while trying to update values`,
                });
              }
            },
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
        if (trigger) {
          if (guildconfig.trigger.includes(roleId))
            return interaction.reply({
              content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
            });
        }
        configmodel.updateOne(
          { guildId: `${guildId}` },
          {
            $addToSet: { trigger: `${roleId}` },
            function(err, doc) {
              if (err)
                return interaction.followUp({
                  content: `there was an error while trying to update values`,
                });
            },
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
        if (removable) {
          if (guildconfig.removable.includes(roleId))
            return interaction.reply({
              content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
            });
        }
        configmodel.updateOne(
          { guildId: `${guildId}` },
          {
            $addToSet: { removable: `${roleId}` },
            function(err, doc) {
              if (err)
                return interaction.followUp({
                  content: `there was an error while trying to update values`,
                });
            },
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
        var logchannel = channel.id;
        if (guildconfig.logchannel == "logchannel")
          return interaction.reply({
            content: `the configuration already contains this value, if you want to delete it, please use the /delconfig command`,
          });

        configmodel.updateOne(
          { guildId: `${guildId}` },
          {
            $set: { logchannel: `${logchannel}` },
            function(err, doc) {
              if (err)
                return interaction.followUp({
                  content: `there was an error while trying to update values`,
                });
            },
          }
        );

        interaction
          .editReply({ content: `${type} is now <#${logchannel}>` })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
        interaction
          .followUp({ content: `${type} is now <#${logchannel}>` })
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
