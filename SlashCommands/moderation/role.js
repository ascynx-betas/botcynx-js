const { Command } = require('reconlx');

module.exports = new Command ({
    name: "role",
    description: "remove / add a role to the target",
    userPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name:'action',
            description: "what is the action the bot will do",
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                }
            ]
        },
        {
            name: 'role',
            description: "the role given",
            type: "ROLE",
            required: true,
        },
        {
            name: 'target',
            description: "the person that will receive the role",
            type: "USER",
            required: true,
        }
    ],

    run: async({ interaction }) => {

        try { 

            const role = interaction.options.getRole('role');
            const target = interaction.options.getMember('target');
            const action = interaction.options.getString('action');
            const roleId = role.id;


            if (action === "add") {
                if(role.position >= interaction.member.roles.highest.position) {
                    return interaction.followUp({
                content: "You can't give this role as it's higher or equal to your current highest role",
            });
            } else if(role.position < interaction.member.roles.highest.position) {
                if (!role.managed === true) {
                target.roles.add(roleId),
                interaction.followUp({content: `<@&${roleId}> was added to ${target.user.tag}`, allowedMentions: {parse :[]}})
                } else {
                    interaction.followUp({content: `<@&${roleId}> is managed by discord / a bot`, allowedMentions: {parse :[]}})
                }
            } else {
                 interaction.followUp({content: 'uhhh theres an error'})
                }
        }else if (action === "remove") {
                if(role.position >= interaction.member.roles.highest.position) 
                    return interaction.followUp({
                content: "You can't remove this role as it's higher or equal to your current highest role",
            });
            if(role.position < interaction.member.roles.highest.position) {
                if (!role.managed === true) { 
                target.roles.remove(roleId),
                interaction.followUp({content: `<@&${roleId}> was removed from ${target.user.tag}`, allowedMentions: {parse :[]}})
                } else {
                    interaction.followUp({content: `<@&${roleId}> is managed by discord / a bot`, allowedMentions: {parse :[]}})
                }
        }
        }else {
            interaction.followUp({content: `missing an argument`})
        }
        } catch (err) {
            console.log(err)
            interaction.followUp({content: `there was an error executing this command`});
        };

    }
})