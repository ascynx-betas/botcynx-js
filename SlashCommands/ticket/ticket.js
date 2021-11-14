const { Command } = require('reconlx');
const fs = require('fs');

module.exports = new Command ({
    name: 'ticket',
    description: 'allows to modify ticket config / execute ticket commands',
    userPermissions: ['MANAGE_THREADS'],
    devonly: true,
    options: [
        {
           name:'sub-command',
           description: 'the sub-command to execute',
           required: 'true',
           type: 'STRING',
           choices: [
               {
                    name: 'del',
                    value: 'del'
                },
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name:'close',
                    value: 'close'
                },
                {
                    name:'block',
                    value: 'block'
                }
           ]
           
        },   
        {
            name: 'config-name',
            description: 'the name of the config',
            required: false,
            type: 'STRING'
        },   
        {
            name:'user',
            description: 'target of the action',
            required: false,
            type: 'USER'
        },
                   
                   
               
           
        
    ],

    run: async ({ interaction, message, client }) => {
        try {

        const action = interaction.options.getString('sub-command');
        const config = interaction.options.getString('config-name');
        const target = interaction.options.getUser('user')
        const guildId = interaction.guild.id;
        const channel = interaction.channel
            if (action != "del") {
        if (!interaction.channel.isThread) {
            interaction.followUp({content: `the channel in which you executed this command is not a thread`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
        }   else {
            //code
            if (action == "close") {
                const thread = interaction.channel
                interaction.followUp({content: `Locking thread...`, ephemeral: true}).then(thread.setLocked()).then(thread.setArchived()).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

            } else if (action == "add") {
                const thread = interaction.channel
                if (typeof(target) == "undefined") {
                    interaction.followUp({content: ` please enter a valid user when executing this command`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                } else {
                thread.members.add(`${target.id}`).then(() => interaction.followUp({content:`successfully added ${target.tag} to the thread`})).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))}
            } else if (action == "block") {
                interaction.followUp({content: `this command is not currently coded in`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            }else{
            interaction.followUp({content: `this command is not currently coded in`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            }
        }
        } else {
            const delc = require(`../../guild-only/${guildId}/${config}.json`)
        //code of del
            fs.unlinkSync(`guild-only/${guildId}/${config}.json`, (err) => {
                if (err) {
                    console.log(err);
                    return interaction.followUp({content: `error while trying to delete file`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`));
                }
                interaction.followUp({content: `you can now delete the ticket creator 👍`})
            })
        }
    

    }catch(err) {console.log(err)}
    }
})