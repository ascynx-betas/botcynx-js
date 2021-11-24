const { Command } = require("reconlx");
const configmodel = require("../../models/config");

module.exports = new Command({
  name: "deldevconfig",
  description: "Delete guild configurations",
  userPermissions: ["MANAGE_ROLES"],
  devonly: true,
  options: [
    {
      name: "type",
      description: "the array you want to modify",
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
      ],
    },
    {
      name: "role",
      description: `the role that will be removed`,
      required: true,
      type: "ROLE",
    },
  ],

  run: async ({ client, interaction }) => {
    try {
      const type = interaction.options.getString("type");
      const guildId = interaction.guild.id;
      const guildconfig = await configmodel.find({
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
        }).save();
        return interaction.followUp({
          content: `configuration was missing, please re-use the command`,
        });
      }
      const role = interaction.options.getRole("role");
      let logchannel = guildconfig[0].logchannel;

      interaction
        .followUp({ content: `attempting the change, please wait...` })
        .catch(() =>
          console.log(
            `I don't have permission to send a message in ${channel} in ${guild.name}`
          )
        );

      if (type === "bypass") {
        const roleId = role.id;
        if (!guildconfig[0].bypass.includes(roleId))
          return interaction.editReply({
            content: `${role} isn't in the configuration, if you want to add it please use /setconfig`,
            allowedMentions: { parse: [] },
          });
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $pull: { bypass: `${roleId}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `the changes to ${type} have been made, it may take a few minutes for the config to notice the changes`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else if (type === "removable") {
        const roleId = role.id;
        if (!guildconfig[0].removable.includes(roleId))
          return interaction.editReply({
            content: `${role} isn't in the configuration, if you want to add it please use /setconfig`,
            allowedMentions: { parse: [] },
          });
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $pull: { removable: `${roleId}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `the changes to ${type} have been made, it may take a few minutes for the config to notice the changes`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else if (type === "trigger") {
        const roleId = role.id;
        if (!guildconfig[0].trigger.includes(roleId))
          return interaction.editReply({
            content: `${role} isn't in the configuration, if you want to add it please use /setconfig`,
            allowedMentions: { parse: [] },
          });
        configmodel.updateOne(
          { guildId: `${guildId}` },
          { $pull: { trigger: `${roleId}` } },
          function (err, doc) {
            if (err)
              return interaction.followUp({
                content: `there was an error while trying to update values \`\`${err}\`\``,
              });
          }
        );

        interaction
          .followUp({
            content: `the changes to ${type} have been made, it may take a few minutes for the config to notice the changes`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      } else {
        interaction
          .followUp({ content: `${type} is not a recognized type` })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      }
      if (logchannel) {
        client.channels.cache.get(logchannel).send({
          content: `configuration was modified by \`\`${interaction.user.tag}\`\`\nthe changes may take a few minutes for them to take effect`,
        });
      }
    } catch (err) {
      console.log(err);
      if (typeof logchannel === !"undefined") {
        channel.send({ content: err });
      }
    }
  },
});
