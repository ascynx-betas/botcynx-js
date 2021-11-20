const { Command } = require('reconlx');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = new Command ({
    name: 'info',
    description: 'gives informations about the bot and it\'s creator',

    run: async ({ interaction, client }) => {
        try {
            const buttonrow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`info hypixel`)
                        .setLabel('Hypixel')
                        .setStyle('SECONDARY')
                ).addComponents(
                    new MessageButton()
                        .setCustomId(`info config`)
                        .setLabel('Config')
                        .setStyle('SECONDARY')
                ).addComponents(
                    new MessageButton()
                        .setCustomId(`info moderation`)
                        .setLabel('Moderation')
                        .setStyle('SECONDARY')
                ).addComponents(
                    new MessageButton()
                        .setCustomId(`info context`)
                        .setLabel('Context Commands')
                        .setStyle('SECONDARY')
                ).addComponents(
                    new MessageButton()
                        .setCustomId(`info main`)
                        .setLabel('Main page')
                        .setStyle('SECONDARY')
                );

        const embed = new MessageEmbed()
        .setTitle(`**Informations**`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Bot Mention: ${client.user}         Developer: Ascynx#2020\n
        To check a command page press the according button`)
        .setColor(`#69696E`)
        .setFooter(`powered by mongodb, senither api and hypixel api`);

        interaction.followUp({embeds: [embed], components: [buttonrow]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

    }catch(err) {
        console.log(err)
    }
}
})