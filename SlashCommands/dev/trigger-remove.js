const { Command } = require('reconlx');
const mp = require('../../personal-modules/testfor')

module.exports = new Command ({
    name: 'reload',
    description: 'allows the user to run the RoleChange event',
    userPermissions: ['MANAGE_ROLES'],
    devonly: true,
    globallydisabled: true,

    run: async ({ client, interaction }) => {
        try {
            const guild = interaction.guild;
            const guildId = guild.id;
            const guildconfig = require(`../../guild-only/${guildId}/config.json`);
            var removable = guildconfig.removable;
            var bypass = guildconfig.bypass;
            var channel = guildconfig.logchannel;
            var trigger = guildconfig.trigger;
            var bypasscheck = 0;
            var newbypasscheck = false;
            var triggercheck = 0;
            var newtriggercheck = false;
            interaction.followUp({content: `starting interaction`, ephemeral:true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            guild.members.fetch()
            removable.forEach(function(removable){
            const role = guild.roles.cache.get(removable)
            const members = role.members
            members.forEach(function(members){
                const roles = members.roles.cache.map(role => role.id)
                const bypasscheck = mp.compare(roles, bypass)
                const triggercheck = mp.compare(roles, trigger)

                console.log(bypasscheck, triggercheck)
                if (bypasscheck == false && triggercheck == false) {
                    members.roles.remove(removable).catch(() => interaction.followUp("I don't have permission to remove that role"))
                client.channels.cache.get(channel).send({content: `<@&${removable}> was removed from ${members.user.tag}`, allowedMentions: {parse :[]}}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                interaction.followUp({content: `<@&${removable}> has been removed from ${members.user.tag}`, allowedMentions: {parse :[]}})
                }
            })
            })

        }catch (err) {
            console.log(err)
        }

    }
})

// urgent fix this
// one of the check failed, why, it should do 1 member at a time
//currently not sure if it is fixed or not
//currently it only runs the command if the person doesn't have any other role
// also it seems to only check one member and acts upon the result of that user alone

//Might be fixed