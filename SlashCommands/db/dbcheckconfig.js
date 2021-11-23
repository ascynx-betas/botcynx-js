const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const configmodel = require("../../models/config");

module.exports = new Command({
  name: "devcheckconfig",
  description:
    "allows the user to check the configuration of the current guild",
  userPermissions: ["MANAGE_ROLES"],
  devonly: true,

  run: async ({ client, interaction }) => {
    try {
      const guildId = interaction.guild.id;
      const guildconfig = await configmodel.find({
        guildId: guildId,
      });
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
      const name = guildconfig.name;
      const removable = guildconfig.removable;
      const trigger = guildconfig.trigger;
      const bypass = guildconfig.bypass;
      const su = guildconfig.su;
      var suspliced = [];
      var removablespliced = [];
      var bypassspliced = [];
      var triggerspliced = [];
      var test = 0;
      if (su) {
        if (su.length > 1) {
          test = 0;
          su.forEach(function (su) {
            if (su != "") {
              var susplice = `<@${su}>`;
              suspliced.splice(test, test, susplice);
            }
            test += 1;
            return suspliced;
          });
        } else if ((su.length = 1 && su != "")) {
          var suspliced = `<@${su}>`;
        } else {
          var suspliced = `~~**no super users set on this guild**~~`;
        }
      }
      if (removable) {
        if (removable.length > 1) {
          removable.forEach(function (removable) {
            if (removable != "") {
              var removablesplice = `<@&${removable}>`;
              removablespliced.splice(test, test, removablesplice);
            }
            test += 1;
            return removablespliced;
          });
        } else if ((removable.length = 1 && removable != "")) {
          var removablespliced = `<@&${removable}>`;
        } else {
          var removablespliced = `~~**unset value**~~`;
        }
        test = 0;
      }
      if (bypass) {
        if (bypass.length > 1) {
          bypass.forEach(function (bypass) {
            if (bypass != "") {
              var bypasssplice = `<@&${bypass}>`;
              bypassspliced.splice(test, test, bypasssplice);
            }
            test += 1;
            return bypassspliced;
          });
        } else if ((bypass.length = 1 && bypass != "")) {
          var bypassspliced = `<@${bypass}>`;
        } else {
          var bypassspliced = `~~**unset value**~~`;
        }
        test = 0;
      }
      if (trigger) {
        if (trigger.length > 1) {
          trigger.forEach(function (trigger) {
            if (trigger != "") {
              var triggersplice = `<@&${trigger}>`;
              triggerspliced.splice(test, test, triggersplice);
            }
            test += 1;
            return triggerspliced;
          });
        } else if ((trigger.length = 1 && trigger != "")) {
          var triggerspliced = `<@&${trigger}>`;
        } else {
          var triggerspliced = `~~**unset value**~~`;
        }
      }
      if (
        !triggerspliced ||
        !removablespliced ||
        !suspliced ||
        !bypassspliced
      ) {
        const description = `${name || `not set`}'s config \n
             \`\`guild id:\`\` ${guildId || `unset value`} \n
              \`\`removable(s):\`\` ${
                removablespliced || `no removables set`
              } \n
               \`\`trigger(s):\`\` ${triggerspliced || `no triggers set`} \n
                \`\`bypass(es):\`\` ${bypassspliced || `no bypasses set`} \n
                 \`\`Elevated permissions:\`\` ${
                   suspliced || `no super users added`
                 }\n
                  \`\`(when using the /delconfig command, a slot is 1 role (it's id)), as it's an array each config starts with the slot [0]\`\``;

        const embed = new MessageEmbed()
          .setAuthor(`${client.user.tag}`)
          .setDescription(description)
          .setColor(`RED`)
          .setTimestamp();
        interaction.followUp({
          embeds: [embed],
          allowedMentions: { parse: [] },
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
//need to fix a stupid bug, that makes it so it requires a restart to take into account additions outside bot additions
