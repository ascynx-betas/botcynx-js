const { Command } = require('reconlx');

module.exports = new Command ({
    name: 'reload',
    description: 'allows the user to run the RoleChange event',
    userPermissions: ['MANAGE_ROLES'],
    devonly: true,

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
            guild.members.fetch().then((members) => {})
            removable.forEach(function(removable){
            let list = guild.members.cache.filter(m => m.roles.cache.get(removable));
            list.forEach(function(list){
                bypass.forEach(function(bypass){
                    if(list.roles.cache.has(bypass)) {
                        bypasscheck += 1
                    }
                })
                if (bypasscheck > 0) {
                    newbypasscheck = true
                } else {
                    newbypasscheck = false
                }
                trigger.forEach(function(trigger){
                    if(list.roles.cache.has(trigger)) {
                        triggercheck += 1
                    }
                })
                if (triggercheck > 0) {
                    newtriggercheck = true;
                } else {
                    newtriggercheck = false;
                }

                if (newbypasscheck == false && newtriggercheck == false) {
                    list.roles.remove(removable).catch(() => interaction.followUp("I don't have permission to remove that role"))
                client.channels.cache.get(channel).send({content: `<@&${removable}> was removed from ${list.user.tag}`, allowedMentions: {parse :[]}}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                interaction.followUp({content: `<@&${removable}> has been removed from ${list.user.tag}`, allowedMentions: {parse :[]}})
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