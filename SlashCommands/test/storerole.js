const { Client, CommandInteraction } = require("discord.js");
const rolemodel = ("../../models/rolevalues.js");

module.exports = {
    name: 'roles',
    description: "store / change a certain role for uses in the bot",
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
        name: 'role',
            description: 'role to add',
            type: 'ROLE',
            required: true
    },
    {
        name: 'type',
        description: 'the type of role to add',
        required: true,
        type: 'STRING',
        choice: [
            {
                name: 'trigger',
                description: 'role that the bot will detect',
            },
            {
                name: 'removable',
                description: 'role that will be removed if the trigger is removed',
            }
        ]
    }
],

run: async(client, interaction, args) => {
        const roleId = interaction.options.getRole('role');
        const type = interaction.options.getString('type');
        new rolemodel({
            roleId,
            guildId: interaction.guild.id,
            type,
        }).save();
        interaction.followUp({ content: `${roleId} has been added to ${type}` })
    }
}