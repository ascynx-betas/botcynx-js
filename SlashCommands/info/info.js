const { Command } = require('reconlx');
const { MessageEmbed } = require('discord.js');
module.exports = new Command ({
    name: 'info',
    description: 'gives informations about the bot and it\'s creator',

    run: async ({ interaction }) => {
        try {
        const guildId = interaction.guild.id;
        const guildconfig = require(`../../guild-only/${guildId}/config.json`)
        const disabledcommands = 100;
        const allowedcommands = guildconfig.disabledcommands
        if (disabledcommands ===! allowedcommands) {
        interaction.followUp({content: `the command is currently in development and has been disabled`})
        } else {
            //the code
            
            const embed = new MessageEmbed()
        .setTitle(`Informations`)
        .setAuthor(`Cat bot#0679`)
        .setDescription(`Cat bot is a bot coded by <@376647579653636096> in JavaScript \n the code is based on reconlx's djs-base-handler \n\n currently the bot has the available commands \n\n \`\`/addconfig\`\` which allows server admins to add roles to the configuration \n \`\`/delconfig\`\` which allows server admins to remove roles from the configuration \n \`\`/checkconfig\`\` which allows to see the configuration of the bot on the current guild \n \`\`/echo\`\` a commands that allows to speak through the bot \n \`\`/ping\`\` which allows the user to see the current ping of the bot \n \`\`/info\`\` the command you just used, which allows to get the informations on the bot \n \`\`/role\`\` allows a user to add / remove a role from someone (limited to the user's permissions / the bot's permissions)  `)
        .setColor(`#69696E`);

        interaction.followUp({embeds: [embed]});
        }
    }catch(err) {
        console.log(err)
    }
}
})