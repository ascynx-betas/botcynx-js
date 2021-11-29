const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "getAvatar",
  type: "USER",

  run: async (client, interaction, args) => {
    const user = await client.users.fetch(interaction.targetId);

    const embed = new MessageEmbed()
      .setAuthor(user.tag, ``, user.displayAvatarURL({ dynamic: true }))
      .setImage(user.displayAvatarURL({ dynamic: true }));

    interaction
      .followUp({ embeds: [embed], ephemeral: true })
      .catch(() =>
        console.log(
          `I don't have permission to send a message in ${channel} in ${guild.name}`
        )
      );
  },
};
