const { Command } = require("reconlx");
const mp = require("../../personal-modules/testfor");
const config = require("../../models/config");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "reload",
  description: "allows the user to run the RoleUpdate event",
  userPermissions: ["MANAGE_ROLES"],
  botPermissions: ["MANAGE_ROLES"],
  devonly: true,
  globallydisabled: true,
  options: [
    {
      name: "testrun",
      description: "test run of the command",
      type: "BOOLEAN",
      required: "false",
    },
  ],

  run: async ({ client, interaction }) => {
    let testrun = interaction.options.getBoolean("testrun") || false;

    const guild = interaction.guild;
    const guildId = guild.id;
    const guildconfig = await config.find({
      guildId: guildId,
    });
    let r = (removable = guildconfig[0].removable);

    if (removable.length < 1)
      return interaction.followUp({
        content: `I have no idea what to say here, tbf but for some reason, you can't use that command`,
      });
    let bypass = guildconfig[0].bypass || [];
    let trigger = guildconfig[0].trigger || [];
    bypass = bypass.concat(trigger); //add trigger to bypass
    let affectedMembers = [];

    guild.members.fetch(); //fetch all guild users

    removable.forEach(function (removable) {
      const members = guild.members.cache.filter((m) =>
        m._roles.includes(removable)
      ); //ALL MEMBERS THAT HAVE THE CURRENT REMOVABLE ROLE

      members.forEach(function (member) {
        let roles = guild.members.cache.get(member.id)._roles; //Array of roles

        if (roles.includes(removable)) {
          let has;
          if (bypass.length > 0) {
            has = mp.ct(roles, bypass);
          } else {
            has = { success: false };
          }
          if (has.success === false) {
            if (testrun == false) {
              guild.members.cache
                .get(member.id)
                .roles.remove(removable)
                .then(affectedMembers.push(`${member}`));
            } else if (testrun == true) {
              affectedMembers.push(`${member}`);
            }
          } // if doesn't have a bypass / trigger role
        } //check for the current check role (removable)
      });
      let index = r.indexOf(removable); //the current index
      if (index >= r.length - 1) {
        const affectedString =
          affectedMembers.join("\n") || "**no members were affected**";
        let description;

        if (testrun == true) {
          description = `Test Run\n**Affected members**:\n${affectedString}`;
        } else {
          description = `**Affected members**:\n${affectedString}`;
        }

        const embed = new MessageEmbed()
          .setDescription(description)
          .setTitle("**Reloading results**")
          .setFooter("Amogus beans");
        return interaction.followUp({ embeds: [embed] });
      } //end of interaction
      if (index >= r.length - 1) return;
    });
  },
});
