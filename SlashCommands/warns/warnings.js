const warnmodel = require('../../models/warnmodel');
const moment = require('moment');
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'warnings',
    description: 'display the warnings',
    userPermissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name:'target',
            description: 'The target you want to check',
            type: 'USER',
            required: true
        },
    ],

    run: async(client, interaction, args) => {
        const user = interaction.options.getUser('target');

        const userWarnings = await warnmodel.find({
            userId: user.id,
            guildId: interaction.guildId,
        });

        if(!userWarnings?.length) return interaction.followUp({content: `${user} has no warning in this server`});

        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
                );

                return [
                    `warnID: ${warn.id}`,
                    `Moderator: ${moderator || 'Has left'}`,
                    `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
                    `reason: ${warn.reason}`,
                ].join("\n");
        }).join("\n\n");

        const embed = new MessageEmbed()
        .setTitle(`${user.tag}'s warnings`)
        .setDescription(embedDescription)
        .setColor("RED");

        interaction.followUp({embeds: [embed]});
    },

}