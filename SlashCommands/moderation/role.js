const { Command } = require('reconlx');
const config = require('../../config.json')

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
                if (role.position >= interaction.member.roles.highest.position && interaction.member.id != interaction.guild.ownerId && interaction.member.id != config.developerId) {
                    return interaction.followUp({
                content: "You can't give this role as it's higher or equal to your current highest role",
            });
            } else if(role.position < interaction.member.roles.highest.position || interaction.member.id === interaction.guild.ownerId) {
                if (!role.managed === true) {
                target.roles.add(roleId).catch(() => interaction.followUp("I don't have permission to give that role"))
                interaction.followUp({content: `<@&${roleId}> was added to ${target.user.tag}`, allowedMentions: {parse :[]}})
                } else {
                    interaction.followUp({content: `<@&${roleId}> is managed by either a bot or discord`, allowedMentions: {parse :[]}})
                }
            } else {
                 interaction.followUp({content: 'there was an error while executing this command'})
                }
        }else if (action === "remove") {
                if (role.position >= interaction.member.roles.highest.position && interaction.member.id != interaction.guild.ownerId && interaction.member.id != config.developerId) 
                    return interaction.followUp({
                content: "You can't remove this role as it's higher or equal to your current highest role",
            });
            if(role.position < interaction.member.roles.highest.position || interaction.member.id === interaction.guild.ownerId) {
                if (!role.managed === true) { 
                target.roles.remove(roleId).catch(() => interaction.followUp("I don't have permission to remove that role"))
                interaction.followUp({content: `<@&${roleId}> was removed from ${target.user.tag}`, allowedMentions: {parse :[]}})
                } else {
                    interaction.followUp({content: `<@&${roleId}> is managed by either a bot or discord`, allowedMentions: {parse :[]}})
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