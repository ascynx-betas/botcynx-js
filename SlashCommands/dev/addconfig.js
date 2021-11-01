const { Command } = require("reconlx");

module.exports = new Command ({
    name: 'addconfig',
    description: "store / change a certain role for uses in the bot",
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
        name: 'role',
            description: 'role to add',
            type: 'ROLE',
            required: true
    },
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
            }
        ]
    },
],

run: async({ interaction }) => {
    try {
        const fs = require('fs');
        const role = interaction.options.getRole('role');
        const type = interaction.options.getString('type');
        const guildId = interaction.guild.id;
        const guildconfig = require(`../../guild-only/${guildId}/config`);
        const roleId = role.id
        const editvalue = 0;
        const name = guildconfig.name;
const logchannel = guildconfig.logchannel
var test = 0;
var removablespliced = [""];
var bypassspliced = [""];
var triggerspliced = [""];
var success = false;

        var bypass = guildconfig.bypass;
        var removable = guildconfig.removable;
        var trigger = guildconfig.trigger;



        if (type === "bypass") {
            var bypass = guildconfig.bypass;
            bypass.splice(editvalue, 0, roleId);

            interaction.editReply({content: `array ${type} is now ${bypass.toString()}`});
            interaction.followUp({ content: `${role} has been added to ${type}`, allowedMentions: {parse :[]}})
            var successful = true;
        } else if (type === "trigger") {
            var trigger = guildconfig.trigger;

            trigger.splice(editvalue, 0, roleId);

            interaction.editReply({ content: `array ${type} is now ${trigger.toString()}`});
            interaction.followUp({ content: `${role} has been added to ${type}`, allowedMentions: {parse :[]}})
            var successful = true;
        } else if (type === "removable") {
            var removable = guildconfig.removable;

            removable.splice(editvalue, 0, roleId);

            interaction.editReply({ content: `array ${type} is now ${removable.toString()}`});
            interaction.followUp({ content: `${role} has been added to ${type}`, allowedMentions: {parse :[]}})
            var successful = true;
        } else {
            interaction.followUp({content: `argument type not supported`})
            var successful = false;
            
        };        

interaction.followUp({content: `trying to modify, please wait...`})

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
const fullitem = `{
    "name": "${name}",
    "guildId": "${guildId}",
    "trigger": [${triggerspliced}],
    "bypass": [${bypassspliced}],
    "removable": [${removablespliced}],
    "logchannel": "${logchannel}"
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
    } catch (err) {
        console.log(err); 
        interaction.editReply({ content: `there was an error executing this command`})
    }
}
})