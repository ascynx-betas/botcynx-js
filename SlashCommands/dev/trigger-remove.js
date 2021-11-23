const { Command } = require("reconlx");
const mp = require("../../personal-modules/testfor");

module.exports = new Command({
  name: "reload",
  description: "allows the user to run the RoleChange event",
  userPermissions: ["MANAGE_ROLES"],
  devonly: true,
  globallydisabled: true,

  run: async ({ client, interaction }) => {
    try {
      const guild = interaction.guild;
      const guildId = guild.id;
      const guildconfig = require(`../../guild-only/${guildId}/config.json`);
      let removable = guildconfig.removable;
      let bypass = guildconfig.bypass;
      let channel = guildconfig.logchannel;
      let trigger = guildconfig.trigger;

      interaction
        .followUp({ content: `starting interaction`, ephemeral: true })
        .catch(() =>
          console.log(
            `I don't have permission to send a message in ${channel} in ${guild.name}`
          )
        );
      guild.members.fetch();
      removable.forEach(function (removable) {
        const role = guild.roles.cache.get(removable);
        const members = role.members;
        members.forEach(function (members) {
          const roles = members.roles.cache.map((role) => role.id);
          const bypasscheck = mp.compare(roles, bypass);
          const triggercheck = mp.compare(roles, trigger);

          if (bypasscheck == false && triggercheck == false) {
            members.roles
              .remove(removable)
              .catch(() =>
                interaction.followUp(
                  "I don't have permission to remove that role"
                )
              );
            client.channels.cache
              .get(channel)
              .send({
                content: `<@&${removable}> was removed from ${members.user.tag}`,
                allowedMentions: { parse: [] },
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
            interaction.followUp({
              content: `<@&${removable}> has been removed from ${members.user.tag}`,
              allowedMentions: { parse: [] },
            });
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
});

//Might be fixed
