const { Command } = require('reconlx')

module.exports = new Command ({
    name: 'checkconfig',
    description: 'allows the user to check the configuration of the current guild',
    userPermissions: ['MANAGE_ROLES'],

    run: async({ interaction }) => {
        try {
            const guildId = interaction.guild.id;
            const guildconfig = require(`../../guild-only/${guildId}/config`);
            const name = guildconfig.name;
            const removable = guildconfig.removable;
            const trigger = guildconfig.trigger;
            const bypass = guildconfig.bypass;
            var removablespliced = [""];
            var bypassspliced = [""];
            var triggerspliced = [""];
            var test = 0;


            if (removable.length > 1) {
                removable.forEach(function(removable) {
                    var removablesplice = `<@&${removable}>`
                    removablespliced.splice(test, test, removablesplice)
                    test += 1;
                    return removablespliced
                });
                } else if (removable.length = 1){
                    var removablespliced = `<@${removable}>`
                } else {
                    var removablespliced;
                }
                test = 0;
                if (bypass.length > 1) {
                bypass.forEach(function(bypass) {
                    var bypasssplice = `<@&${bypass}>`
                    bypassspliced.splice(test, test, bypasssplice)
                    test += 1;
                    return bypassspliced
                });
            } else if (bypass.length = 1){
                var bypassspliced = `<@${bypass}>`
            } else {
                var bypassspliced;
            }
                test = 0;
                if (trigger.length > 1) {
                trigger.forEach(function(trigger) {
                    console.log(trigger)
                    var triggersplice = `<@&${trigger}>`
                    triggerspliced.splice(test, test, triggersplice)
                    test += 1;
                    return triggerspliced
                });
            } else if (trigger.length = 1){
                var triggerspliced = `<@&${trigger}>`
            } else {
                var triggerspliced;
            }

            interaction.editReply({content: `${name || `not set`}'s config \n \`\`guild id:\`\` ${guildId || `unset value`} \n \`\`removable(s):\`\` ${removablespliced || `no removables set`} \n \`\`trigger(s):\`\` ${triggerspliced || `no triggers set`} \n \`\`bypass(es):\`\` ${bypassspliced || `no bypasses set`} \n \`\`(when using the /delconfig command, a slot is 1 role (it's id)), as it's an array each config starts with the slot [0]\`\``, allowedMentions: {parse :[]}})

        }catch (err) {
            console.log(err)
        }
    }
    
});