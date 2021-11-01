const client = require("../index");
function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

//currently searching for a way to get the guildId to get from a certain folder, this is pain



client.on("guildMemberUpdate",(oldMember, newMember) => {
try {
    var newbypasscheck = 0;
    var bypasscheck = 0;

    var guildcache = oldMember.roles.guild.id

    
    setInterval(() => {
        config = requireUncached(`../guild-only/${guildcache}/config.json`)
    }, 500)


    
    const cachedconfig = require(`../guild-only/${guildcache}/config.json`);

          
        var trigger = cachedconfig.trigger;
        var channel = cachedconfig.logchannel;
        var bypass = cachedconfig.bypass;
        var removable = cachedconfig.removable;
 


    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        trigger.forEach(function(trigger){

        
        if (!oldMember.roles.cache.has(trigger) && newMember.roles.cache.has(trigger)) {
            client.channels.cache.get(channel).send({content: `${newMember.user.tag} now has <@&${trigger}>`, allowedMentions: {parse :[]}});
        }
    if (oldMember.roles.cache.has(trigger) && !newMember.roles.cache.has(trigger)) {
            client.channels.cache.get(channel).send({content: `${newMember.user.tag} lost <@&${trigger}>`, allowedMentions: {parse :[]}});

                    bypass.forEach(function(bypass, bypasscheck) {
                        if (newMember.roles.cache.has(bypass)) {
                            var bypasscheck = 1
                            newbypasscheck = bypasscheck || 0;
                        }
                    });
                    if (newbypasscheck === 0) {
                        removable.forEach(function(removable) {
                            if (newMember.roles.cache.has(removable)) {
                                newMember.roles.remove(removable);
                                client.channels.cache.get(channel).send({content: `<@&${removable}> was removed from ${newMember.user.tag}`, allowedMentions: {parse :[]}});
                            }
                        });
            }
        }
    })
    }
}catch (err) {
    console.log(err)
}
})