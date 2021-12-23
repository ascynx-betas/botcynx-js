const { Command } = require("reconlx");
const ms = require("ms");
const client = require("../../index");
module.exports = new Command({
  name: "timeout",
  description: "timeout a user for a specified amount of time",
  userPermissions: ["MODERATE_MEMBERS"],
  options: [
    {
      name: "user",
      type: "USER",
      description: "target to timeout",
      required: true,
    },
    {
      name: "time",
      type: "STRING",
      description: "time for timeout",
      required: false,
    },
    {
      name: "reason",
      type: "STRING",
      description: "reason for timeout",
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    let target = interaction.options.getUser("user");
    let time = interaction.options.getString("time");
    let reason = interaction.options.getString("reason");
    if (time === null) time = "1 hour";
    
    let TimeForTimeout = ms(time);
    const guildMember = interaction.guild.members.cache.get(target.id);
    
    if (target.bot == true) return interaction.followUp({content: `sorry if that bot annoys you, but I don't like hurting my friends :frowning2:`})
    if (interaction.user.id == target.id) return interaction.followUp({content: `you cannot timeout yourself !`})
    if (typeof guildMember === "undefined")
      return interaction.followUp({
        content: `user provided isn't in this server`,
      });
      if (guildMember.roles.highest.position >= interaction.guild.members.cache.get(interaction.user.id).roles.highest.position &&
         interaction.user.id != interaction.guild.ownerId &&
          interaction.user.id != client.config.developerId ||
          guildMember.id == interaction.guild.ownerId
          ) return interaction.followUp({content: `you cannot timeout this user as it's either the owner or it's highest role is higher to yours !`});

    guildMember
      .timeout(TimeForTimeout, reason || "reason not provided")
      .then(() =>
        interaction.followUp({
          content: `success, timed out ${target} for ${time}`,
          allowedMentions: { parse: [] },
        })
      )
      .catch((error) => {
        if (error.httpStatus == 403) {
          return interaction.followUp({
            content: `I cannot timeout this user as it has a higher role than my highest !`,
          });
        } else if (error.httpStatus == 400) {
          return interaction.followUp({
            content: `You cannot timeout a member for more than ${global.maxTimeOut} !`,
          });
        } else return interaction.followUp({ content: `Unknown Error` });
      });
  },
});
