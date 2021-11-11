const { Command } = require('reconlx');

module.exports = new Command ({
    name: "delconfig",
    description: "Delete guild configurations",
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
            name: "type",
            description:'the array you want to modify',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: "trigger",
                    value: 'trigger',
                },
                {
                    name: 'removable',
                    value: 'removable',
                },
                {
                    name: 'bypass',
                    value: 'bypass'
                }
            ]

        },
        {
            name: 'slot',
            description: `the slot that will be deleted`,
            required: true,
            type: 'INTEGER',
        }
    ],

    run: async({client, interaction }) => {
        try {

            const fs = require('fs');
            const type = interaction.options.getString('type');
            const guildId = interaction.guild.id;
            const guildconfig = require(`../../guild-only/${guildId}/config`);
            const editvalue = interaction.options.getInteger('slot');
            const name = guildconfig.name;
            const verifyrole = guildconfig.verify;
    var logchannel = guildconfig.logchannel
    var test = 0;
    var removablespliced = [""];
    var bypassspliced = [""];
    var triggerspliced = [""];
    var success = false;
    var bypass = guildconfig.bypass;
    var removable = guildconfig.removable;
    var trigger = guildconfig.trigger;

            interaction.followUp({content: `attempting the change, please wait...`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

            if (type === "bypass") {
                bypass.splice(editvalue, 1);

                interaction.followUp({content: `array ${type} is now ${bypass.toString()}`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                var successful = true;
            } else if (type === "removable") {
                removable.splice(editvalue, 1);

                interaction.followUp({content: `array ${type} is now ${removable.toString()}`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                var successful = true;

            } else if (type === "trigger") {
                trigger.splice(editvalue, 1);

                interaction.followUp({content: `array ${type} is now ${trigger.toString()}`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                var successful = true;

            }else {
                interaction.followUp({content: `${type} is not a recognized type`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                var successful = false;
            };


            if (successful === true) {
                if (removable.length > 1) {
                removable.forEach(function(removable) {
                    var removablesplice = `"${removable}"`
                    removablespliced.splice(test, test, removablesplice)
                    test += 1;
                    return removablespliced
                });
                } else {
                    var removablespliced = `"${removable}"`
                }
                test = 0;
                if (bypass.length > 1) {
                bypass.forEach(function(bypass) {
                    var bypasssplice = `"${bypass}"`
                    bypassspliced.splice(test, test, bypasssplice)
                    test += 1;
                    return bypassspliced
                });
            } else {
                var bypassspliced = `"${bypass}"`
            }
                test = 0;
                if (trigger.length > 1) {
                trigger.forEach(function(trigger) {
                    console.log(trigger)
                    var triggersplice = `"${trigger}"`
                    triggerspliced.splice(test, test, triggersplice)
                    test += 1;
                    return triggerspliced
                });
            } else {
                var triggerspliced = `"${trigger}"`
            }
            test = 0;
            if (su.length > 1) {
                su.forEach(function(su) {
                    console.log(su)
                    var susplice = `"${su}"`
                    suspliced.splice(test, test, susplice)
                    test += 1;
                    return suspliced;
                })
         } else {
                var suspliced = `"${su}"`
            }
            if (typeof verifyrole !== 'undefined') {
                const fullitem = `{
                    "name": "${name}",
                    "guildId": "${guildId}",
                    "trigger": [${triggerspliced}],
                    "bypass": [${bypassspliced}],
                    "removable": [${removablespliced}],
                    "logchannel": "${logchannel}",
                    "su": [${suspliced}],
                    "verify": "${verifyrole}"
                }`
                    } else {
                        const fullitem = `{
                            "name": "${name}",
                            "guildId": "${guildId}",
                            "trigger": [${triggerspliced}],
                            "bypass": [${bypassspliced}],
                            "removable": [${removablespliced}],
                            "logchannel": "${logchannel}",
                            "su": [${suspliced}]
                        }`
                
                    }
                
                success = true;
                fs.writeFile(`guild-only/${guildId}/config.json`, fullitem, function(err) {
                    if (err) {
                     console.log(err);
                     success = false;
                    };
                    if (success === true) {
                        interaction.editReply('successfully modified').catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                    } else {
                        interaction.editReply('failed to edit').catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                    }
                })
                }
                client.channels.cache.get(logchannel).send({content: `config has been modified by \`\`${interaction.user.tag}\`\``, allowedMentions: {parse :[]}}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

        }catch (err) {
            console.log(err)
        if (typeof logchannel ===! 'undefined' ) {
            channel.send({content: err})
        }
        }

    }
})
