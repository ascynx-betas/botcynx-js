const { MessageEmbed } = require("discord.js");
const { Command } = require("reconlx");

module.exports = new Command({
  name: "getavatar",
  description: "get the avatar of the specified target",
  options: [
    {
      name: "target",
      description: "the person you will check the avatar of",
      type: "USER",
      required: true,
    },
  ],

  run: async ({ interaction }) => {
    const user = interaction.options.getUser("target");
    const embed = new MessageEmbed()
      .setAuthor(user.tag, ``, user.displayAvatarURL({ dynamic: true }))
      .setImage(user.displayAvatarURL({ dynamic: true }));

    interaction
      .followUp({ embeds: [embed] })
      .catch(() =>
        console.log(
          `I don't have permission to send a message in ${channel} in ${guild.name}`
        )
      );
  },
});
