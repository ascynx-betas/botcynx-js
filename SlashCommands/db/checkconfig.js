const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const configmodel = require("../../models/config");

module.exports = new Command({
  name: "checkconfig",
  description:
    "allows the user to check the configuration of the current guild",
  userPermissions: ["MANAGE_ROLES"],
  devonly: true,

  run: async ({ client, interaction }) => {
      const guildId = interaction.guild.id;
      const config = await configmodel.find({
        guildId: guildId,
      });
      if (!config || config.length == 0) {
        new configmodel({
          name: interaction.guild.name,
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
      const guildconfig = config[0];
      const name = guildconfig.name;
      const removable = guildconfig.removable;
      const trigger = guildconfig.trigger;
      const bypass = guildconfig.bypass;
      const su = guildconfig.su;
      const blocked = guildconfig.blocked;
      let logchannel = guildconfig.logchannel;
      var suspliced = [];
      var removablespliced = [];
      var bypassspliced = [];
      var triggerspliced = [];
      var blockspliced = [];
      let test = 0;
      if (su) {
        if (su.length > 1) {
          test = 0;
          su.forEach(function (su) {
            if (su != "") {
              let susplice = `<@${su}>`;
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
              let removablesplice = `<@&${removable}>`;
              removablespliced.splice(test, test, removablesplice);
            }
            test += 1;
            return removablespliced;
          });
        } else if ((removable.length = 1 && removable != "")) {
          removablespliced = `<@&${removable}>`;
        } else {
          removablespliced = `~~**unset value**~~`;
        }
        test = 0;
      }
      if (bypass) {
        if (bypass.length > 1) {
          bypass.forEach(function (bypass) {
            if (bypass != "") {
              let bypasssplice = `<@&${bypass}>`;
              bypassspliced.splice(test, test, bypasssplice);
            }
            test += 1;
            return bypassspliced;
          });
        } else if ((bypass.length = 1 && bypass != "")) {
          bypassspliced = `<@&${bypass}>`;
        } else {
          bypassspliced = `~~**unset value**~~`;
        }
        test = 0;
      }
      if (trigger) {
        if (trigger.length > 1) {
          trigger.forEach(function (trigger) {
            if (trigger != "") {
              let triggersplice = `<@&${trigger}>`;
              triggerspliced.splice(test, test, triggersplice);
            }
            test += 1;
            return triggerspliced;
          });
        } else if ((trigger.length = 1 && trigger != "")) {
          triggerspliced = `<@&${trigger}>`;
        } else {
          triggerspliced = `~~**unset value**~~`;
        }
      }
      if (blocked) {
        if (blocked.length > 1) {
          blocked.forEach(function (blocked) {
            if (blocked != "" && blocked != "NoRead") {
              let blocksplice = `<#${blocked}>`;
              blockspliced.splice(test, test, blocksplice);
            }
            test += 1;
            return blockspliced;
          });
        } else if (
          (blocked.length = 1 && blocked != "" && blocked != "NoRead")
        ) {
          blockspliced = `<#${blocked}>`;
        } else if ((blocked.length = 1 && blocked == "NoRead")) {
          blockspliced = `All channels`;
        } else {
          blockspliced = `~~**no blocked channels**~~`;
        }
      }

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
                 \`\`Log Channel:\`\` <#${logchannel}>\n
                 \`\`Blocked channels:\`\` ${blockspliced}\n
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
  },
});
//need to fix a stupid bug, that makes it so it requires a restart to take into account additions outside bot additions
