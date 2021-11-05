const { Command } = require("reconlx");

module.exports = new Command ({
    name: 'setconfig',
    description: "store a certain role for uses in the bot",
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
            name: 'type',
            description: 'the type of role to add',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'trigger',
                    value: 'trigger',
                },
                {
                    name: 'removable',
                    value: 'removable',
                },
                {
                    name: 'bypass',
                    value: 'bypass',
                },
                {
                    name: 'logchannel',
                    value: 'logchannel'
                }
            ]
        },
        {
        name: 'role',
            description: 'role to add',
            type: 'ROLE',
            required: false,
    },
    {
        name: 'channel',
        description: 'only used for setting logchannel',
        type: 'CHANNEL',
        channelTypes: ['GUILD_TEXT'],
        required: false,
    }
],

run: async({client, interaction }) => {
    try {
        const fs = require('fs');
        const role = interaction.options.getRole('role');
        const type = interaction.options.getString('type');
        const channel = interaction.options.getChannel('channel');
        const guildId = interaction.guild.id;
        const guildconfig = require(`../../guild-only/${guildId}/config`);
        const editvalue = 0;
        const name = guildconfig.name;
var su = guildconfig.su;
var logchannel = guildconfig.logchannel
var test = 0;
var removablespliced = [""];
var bypassspliced = [""];
var triggerspliced = [""];
var success = false;
var suspliced = [""];

        var bypass = guildconfig.bypass;
        var removable = guildconfig.removable;
        var trigger = guildconfig.trigger;

        interaction.followUp({content: `starting interaction`})

        if (type === "bypass") {
            const roleId = role.id
            var bypass = guildconfig.bypass;
            bypass.splice(editvalue, 0, roleId);

            interaction.editReply({content: `array ${type} is now ${bypass.toString()}`});
            interaction.followUp({ content: `${role} has been added to ${type}`, allowedMentions: {parse :[]}})
            var successful = true;
        } else if (type === "trigger") {
            const roleId = role.id
            var trigger = guildconfig.trigger;

            trigger.splice(editvalue, 0, roleId);

            interaction.editReply({ content: `array ${type} is now ${trigger.toString()}`});
            interaction.followUp({ content: `${role} has been added to ${type}`, allowedMentions: {parse :[]}})
            var successful = true;
        } else if (type === "removable") {
            const roleId = role.id
            var removable = guildconfig.removable;

            removable.splice(editvalue, 0, roleId);

            interaction.editReply({ content: `array ${type} is now ${removable.toString()}`});
            interaction.followUp({ content: `${role} has been added to ${type}`, allowedMentions: {parse :[]}})
            var successful = true;
        }else if (type === "logchannel") {
            var logchannel = channel.id
            var successful = true;

            interaction.editReply({content: `${type} is now <#${logchannel}>`})
            interaction.followUp({content: `${type} is now <#${logchannel}>`})


        } else {
            interaction.followUp({content: `argument type not supported`})
            var successful = false;
            
        };        

interaction.editReply({content: `trying to modify, please wait...`})

if (successful === true) {
    if (removable.length > 1) {
        removable.forEach(function(removable) {
            var removablesplice = `"${removable}"`
            removablespliced.splice(test, test, removablesplice)
            test += 1;
            return removablespliced;
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
            return bypassspliced;
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
            return triggerspliced;
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
const fullitem = `{
    "name": "${name}",
    "guildId": "${guildId}",
    "trigger": [${triggerspliced}],
    "bypass": [${bypassspliced}],
    "removable": [${removablespliced}],
    "logchannel": "${logchannel}",
    "su": [${su}]
}`

success = true;
fs.writeFile(`guild-only/${guildId}/config.json`, fullitem, function(err) {
    if (err) {
     console.log(err);
     success = false;
    };
    if (success === true) {
        interaction.editReply('successfully added');
    } else {
        interaction.editReply('failed to edit')
    }
})
} 
client.channels.cache.get(logchannel).send({content: `config has been modified by \`\`${interaction.user.tag}\`\``, allowedMentions: {parse :[]}});
    } catch (err) {
        console.log(err); 
        interaction.editReply({ content: `there was an error executing this command`})
    }
}
})

//might be able to fix the <@&> error if I add a check to see if the thing is ""