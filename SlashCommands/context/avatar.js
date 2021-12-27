const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "getAvatar",
  type: "USER",

  run: async (client, interaction, args) => {
    const user = await client.users.fetch(interaction.targetId);

    const embed = new MessageEmbed()
      .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
      .setImage(user.displayAvatarURL({ dynamic: true }));

    interaction
      .followUp({ embeds: [embed], ephemeral: true })
      .catch(() => null);
  },
};
