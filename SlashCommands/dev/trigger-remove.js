const { Command } = require('reconlx');

module.exports = new Command ({
    name: 'reload',
    description: 'allows the user to run the RoleChange event',
    userPermissions: ['MANAGE_ROLES'],

    run: async ({ client, interaction }) => {
        try {
            const guild = interaction.guild;
            const guildId = guild.id;
            const guildconfig = require(`../../guild-only/${guildId}/config.json`);
            var removable = guildconfig.removable;
            var bypass = guildconfig.bypass;
            var channel = guildconfig.logchannel;
            var bypasscheck = 0;
            var newbypasscheck = false;
            var removablelist = [""];
            const disabledcommands = guildconfig.disabledcommands;
            interaction.followUp({content: `starting interaction`, ephemeral:true})
            guild.members.fetch().then((members) => {})
            removable.forEach(function(removable){
            let list = guild.members.cache.filter(m => m.roles.cache.get(removable));
            list.forEach(function(list){
                bypass.forEach(function(bypass){
                    if(list.roles.cache.has(bypass)) {
                        bypasscheck += 1
                    }
                })
                if (bypasscheck === 1) {
                    var newbypasscheck = true
                } else {
                    var newbypasscheck = false
                }
                if (newbypasscheck === false) {
                    list.roles.remove(removable)
                client.channels.cache.get(channel).send({content: `<@&${removable}> was removed from ${list.user.tag}`, allowedMentions: {parse :[]}})
                interaction.followUp({content: `<@&${removable}> has been removed from ${list.user.tag}`, allowedMentions: {parse :[]}})
                }
            })
            })
            
            
            
              
                
            



        }catch (err) {
            console.log(err)
        }

    }
})

//there seem to be a bug somewhere that makes it so it can't get the role list of the member, that's really annoying
// I think I should be doing a reverse engineering and see at which part it breaks, (I might already know, but I'm not 100% sure)
// reverse engineering is not enough, I built this command on a shitty base, I should use mapping instead of arrays, problem is, how the fuck am I supposed to do with maps