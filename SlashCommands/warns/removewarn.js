const warnmodel = require('../../models/warnmodel');

module.exports = {
    name: 'remove-warn',
    description: 'remove a warning',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
    {
        name: 'warnid',
        description: 'the id of the warning',
        type: 'STRING',
        required: true
    },
    ],

    run: async(client, interaction,args) => {
        const warnId = interaction.options.getString('warnid');
        const data = await warnmodel.findById(warnId);

        if(!data)
        return interaction.followUp({
            content: `${warnId} is not valid !`,
        });
        data.delete();
        const user = interaction.guild.members.cache.get(data.userId);
        return interaction.followUp({content: `Removed the warning ${warnId} from ${user}`});
    },
};