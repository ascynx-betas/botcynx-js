const { Command } = require('reconlx');
const { MessageEmbed } = require('discord.js');
module.exports = new Command ({
    name: 'info',
    description: 'gives informations about the bot and it\'s creator',

    run: async ({ interaction, client }) => {
        try {
            
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
            **ticket**\n
            \`\`/setupticket\`\`: allows to create a new ticket channel (thread ticket(detects if the guild has access to private threads))
            \`\`/ticket\`\`: allows the person to execute actions on a ticket / ticket channel
            **moderation**\n
            \`\`/role\`\`: allows the user to give or remove a role from another user (requires to have a role above the role given)
            **Config**\n
            \`\`/setconfig\`\`: allows the user to add a parameter to the guild's configurations
            \`\`/delconfig\`\`: allows the user to remove a parameter from the guild's configurations
            \`\`/dev\`\`: a command useable by the dev / superusers that can be used for fun / unfinished stuff
            \`\`/reload\`\`: a command that when used will check the guild's member according to the configuration
            \`\`/checkconfig\`\`: a command that allows a guild's admin to check the current guild's configuration
        `
        )
        .setColor(`#69696E`);

        interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

    }catch(err) {
        console.log(err)
    }
}
})