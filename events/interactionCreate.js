const client = require("../index");
const config = require("../config");
const { MessageActionRow, MessageButton } = require('discord.js');
try {
client.on("interactionCreate", async (interaction, message) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if(cmd.devonly) {
            const guild = interaction.guild
            var guildconfig = require(`../guild-only/${guild.id}/config.json`)
            var su = guildconfig.su
            var sunumber = su.length
            sutested = 0;
            su.forEach(function(su) {
                if (interaction.member.id != su && interaction.member.id != config.developerId) {
                    sutested += 1
                }
            })
            if (sutested >= sunumber) {
                return interaction.followUp({ content: "this command requires super user permissions to use"});
            }
        } else {
        if(!interaction.member.permissions.has(cmd.userPermissions || []) && interaction.member.id != config.developerId) return interaction.followUp({ content: "you do not have permission to execute this command"})
        }
        cmd.run({ client, interaction, args, message });
        
    }
    if(interaction.isButton()) {


        const guildId = interaction.guild.id
        const guild = interaction.guild
        const channel = interaction.channel
        console.log(interaction.customId)
        if (interaction.customId != "close") {
            const buttonrow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`close`)
                        .setLabel('close ticket')
                        .setStyle('PRIMARY')
                );
            const config = require(`../guild-only/${guildId}/${interaction.customId}.json`)
            if (guild.features.includes('PRIVATE_THREADS')) {
                const thread = await channel.threads.create({
                    name: `${interaction.user.username}-${interaction.customId}`,
                    autoArchiveDuration: 60,
                    type: 'GUILD_PRIVATE_THREAD',
                    reason: `dafuk is a reason`
                }).catch(() => console.log(`I don't have permission to create a private thread in ${channel} in ${guild.name}`))
                    thread.send({content: `${config.welcomemessage}`, components: [buttonrow]}),
                    thread.members.add(`${interaction.user.id}`)
    
            } else {
            const thread = await channel.threads.create({
                name: `${interaction.user.username}-${interaction.customId}`,
                autoArchiveDuration: 60,
                reason: `dafuk is a reason`
            }).catch(() => console.log(`I don't have permission to create a thread in ${channel} in ${guild.name}`))
                thread.send({content: `${config.welcomemessage}`, components: [buttonrow]})
                thread.members.add(`${interaction.user.id}`)
        }
            
        } else {
            const thread = interaction.channel
            if (interaction.channel.type === 'GUILD_PRIVATE_THREAD') {
                channel.send({content: `Locking thread...`, ephemeral: true}).then(thread.setLocked()).then(thread.setArchived());

            } else if (interaction.channel.type === 'GUILD_PUBLIC_THREAD'){
                channel.send({content: `Locking thread...`, ephemeral: true}).then(thread.setLocked()).then(thread.setArchived());
                //channel.send({content: `Locking thread...`, ephemeral: true});
                //thread.setLocked();
                //thread.setArchived();
            } else {
                channel.send({content: `this is not a thread`, ephemeral: true})
            }
    }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        const cmd = command



        if(cmd.devonly) {
            const guild = interaction.guild
            var guildconfig = require(`../guild-only/${guild.id}/config.json`)
            var su = guildconfig.su
            var sunumber = su.length
            sutested = 0;
            su.forEach(function(su) {
                if (interaction.member.id != su && interaction.member.id != config.developerId) {
                    sutested += 1
                }
            })
            if (sutested >= sunumber) {
                return interaction.followUp({ content: "this command requires super user permissions to use"});
            }
        } else {
        if(!interaction.member.permissions.has(cmd.userPermissions || []) && interaction.member.id != config.developerId) return interaction.followUp({ content: "you do not have permission to execute this command"})
        }
        if (command) command.run(client, interaction);
    }
});
}catch(err){console.log}