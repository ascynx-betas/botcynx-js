const { Command } = require ('reconlx');
const { ContextMenuInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'test',
    type: 'USER',
    devonly: true,

    run: async ( client, interaction, args ) => {
        const user = await client.users.fetch(interaction.targetId);

        const embed = new MessageEmbed().setAuthor(user.tag).setImage(user.displayAvatarURL({ dynamic: true }));

        interaction.followUp({embeds: [embed],ephemeral: true});
    }
}