const client = require("../index");
const guild = require("../guild-only/guild.json");
const guildcheck = require("../guild-only/../config.json");
const guildId = (guild.guildId);
const guildcheckId = guildcheck.guildId;
var guildcache = "779489942899785748";
//currently searching for a way to get the guildId to get from a certain folder, this is pain

guildId.forEach(function(guildId, guildcache) {
    console.log(`${guildId} guildId value \n ${guildcheckId} guildcheckId value`)
    if (guildId === guildcheckId) {
        console.log(`${guildId} guildId value \n ${guildcheckId} guildcheckId value`)
        guildcache === guildId;
        return guildcache;
    }
});

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}
var config;
setInterval(() => {
    config = requireUncached(`../guild-only/${guildcache}/config.json`)
}, 500)
var bypasscheck = 0;


client.on("guildMemberUpdate",(oldMember, newMember) => {

    const trigger = (config.trigger);
    const bypass = (config.bypass);
    const channel = (config.logchannel);
    const removable = (config.removable);

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        if (!oldMember.roles.cache.has(trigger) && newMember.roles.cache.has(trigger)) {
            client.channels.cache.get(channel).send(`${newMember.user.tag} now has <@&${trigger}>`);
        }
    if (oldMember.roles.cache.has(trigger) && !newMember.roles.cache.has(trigger)) {
        const channel = (config.logchannel);
            client.channels.cache.get(channel).send(`${newMember.user.tag} lost <@&${trigger}>`);

            var newbypasscheck = 0
                    bypass.forEach(function(bypass, bypasscheck) {
                        console.log(`${bypass}`);
                        if (newMember.roles.cache.has(bypass)) {
                            bypasscheck = 1
                            newbypasscheck = bypasscheck || 0;
                        }
                    });
                    if (newbypasscheck === 0) {
                        removable.forEach(function(removable) {
                            if (newMember.roles.cache.has(removable)) {
                                const channel = (config.logchannel);
                                newMember.roles.remove(removable);
                                client.channels.cache.get(channel).send(`<@&${removable}> was removed from ${newMember.user.tag}`);
                            }
                        });
            }
        }
    }
})