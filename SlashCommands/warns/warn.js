const warnmodel = require('../../models/warnmodel.js');
module.exports = {
    name: 'warn',
    description: 'warn a user',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: 'target',
            description: "the target",
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: "reason for this warn",
            type: 'STRING',
            required: true,
        },
    ],

    run: async(client, interaction, args) => {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

            new warnmodel({
                userId: user.id,
                guildId: interaction.guild.id,
                reason,
                moderatorId: interaction.user.id,
                timestamp: Date.now(),
            }).save();
                interaction.followUp({ content: `${user} has been warned for ${reason}` })
    }
}