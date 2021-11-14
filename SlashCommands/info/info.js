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
                );

        const embed = new MessageEmbed()
        .setTitle(`Informations`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
        `
        Bot Mention: ${client.user}            Developer: Ascynx#2020\n
        **Commands**:
            **Hypixel**\n
            \`\`/hyinfo\`\`: allows the user to get some information about a player on hypixel
            \`\`/stalk\`\`: allows the user to get the current activity of a player
            \`\`/verify\`\`: allows the user to verify themselves into the db
            **ticket**\n
            \`\`/setupticket\`\`: allows to create a new ticket channel (thread ticket(detects if the guild has access to private threads))
            \`\`/ticket\`\`: allows the person to execute actions on a ticket / ticket channel
            **moderation**\n
            \`\`/role\`\`: allows the user to give or remove a role from another user (requires to have a role above the role given)
            **Config**\n
            \`\`/setconfig\`\`: allows the user to add a parameter to the guild's configurations
            \`\`/delconfig\`\`: allows the user to remove a parameter from the guild's configurations
            \`\`/dev\`\`: a command useable by the dev / superusers that can be used for fun / unfinished stuff
            \`\`/reload\`\`: a command that when used will check the guild's member according to the configuration (currently broken)
            \`\`/checkconfig\`\`: a command that allows a guild's admin to check the current guild's configuration
            **Context Commands**\n
            \`\`User - getAvatar\`\`: gives the avatar of the user you used the command on
            \`\`User - getinfo\`\`: gets information of the user from the database\n
            Context commands are commands you can use by right clicking on either a user or a message
            \`\`User = right click user then apps\`\`
            \`\`Message = right click on a message then apps\`\`
        `
        )
        .setColor(`#69696E`)
        .setFooter(`powered by mongodb, slothpixel api and hypixel api`);

        interaction.followUp({embeds: [embed], components: [buttonrow]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

    }catch(err) {
        console.log(err)
    }
}
})