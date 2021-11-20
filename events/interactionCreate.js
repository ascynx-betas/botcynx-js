const client = require("../index");
const config = require("../config");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
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
        if (cmd.globallydisabled) {
            if (interaction.member.id != config.developerId) {
            return interaction.followUp({content:`Command is only useable by the developer due to either being extremely buggy or dangerous`})
            }
        }
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
    // button interactions
    if(interaction.isButton()) {


        const guildId = interaction.guild.id;
        const guild = interaction.guild;
        const channel = interaction.channel;
        const customId = interaction.customId;
        let info = "info";
        let weight = "weight";
        if (customId != "close" && !customId.includes(info) && !customId.includes(weight)) {
            const buttonrow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`close`)
                        .setLabel('close ticket')
                        .setStyle('PRIMARY')
                );
            const config = require(`../guild-only/${guildId}/${customId}.json`)
            if (guild.features.includes('PRIVATE_THREADS')) {
                const thread = await channel.threads.create({
                    name: `${interaction.user.username}-${customId}`,
                    autoArchiveDuration: 60,
                    type: 'GUILD_PRIVATE_THREAD',
                    reason: `dafuk is a reason`
                }).catch(() => console.log(`I don't have permission to create a private thread in ${channel} in ${guild.name}`))
                    thread.send({content: `${config.welcomemessage}`, components: [buttonrow]}),
                    thread.members.add(`${interaction.user.id}`)
    
            } else {
            const thread = await channel.threads.create({
                name: `${interaction.user.username}-${customId}`,
                autoArchiveDuration: 60,
                reason: `dafuk is a reason`
            }).catch(() => console.log(`I don't have permission to create a thread in ${channel} in ${guild.name}`))
                thread.send({content: `${config.welcomemessage}`, components: [buttonrow]})
                thread.members.add(`${interaction.user.id}`)
        }
            
        } else if (customId == 'close'){
            const thread = interaction.channel
            if (interaction.channel.type === 'GUILD_PRIVATE_THREAD') {
                interaction.reply({content: `Locking thread...`, ephemeral: true}).then(thread.setLocked()).then(thread.setArchived());

            } else if (interaction.channel.type === 'GUILD_PUBLIC_THREAD'){
                interaction.reply({content: `Locking thread...`, ephemeral: true}).then(thread.setLocked()).then(thread.setArchived());
                //channel.send({content: `Locking thread...`, ephemeral: true});
                //thread.setLocked();
                //thread.setArchived();
            } else {
                interaction.reply({content: `this is not a thread`, ephemeral: true})
            }
    } else if (customId.includes(info)) {
        //embed list
        const interactioncreator = interaction.message.interaction.user.id
        const embed_moderation = new MessageEmbed()
        .setTitle(`**Moderation**`)
        .setDescription(`\`\`/role\`\`: allows the user to give or remove a role from another user\n(requires to have a role above the role given)`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        const embed_hypixel = new MessageEmbed()
        .setTitle(`**Hypixel**`)
        .setDescription(`\`\`/hyinfo:\`\` allows the user to get some information about a player on hypixel
                        \`\`/stalk:\`\` allows the user to get the current activity of a player
                        \`\`/verify:\`\` allows the user to verify themselves into the db`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        const embed_context = new MessageEmbed()
        .setTitle(`**Context Commands**`)
        .setDescription(`\`\`User - getAvatar:\`\` gives the avatar of the user you used the command on
                        \`\`User - getinfo:\`\` gives information about the user from the database`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        const embed_config = new MessageEmbed()
        .setTitle(`**Config**`)
        .setDescription(`\`\`/setconfig:\`\` allows the user to add a parameter to the guild's configurations
        \`\`/delconfig:\`\` allows the user to remove a parameter from the guild's configurations
        \`\`/dev:\`\` a command useable by the dev / superusers that can be used for fun / unfinished stuff
        \`\`/reload:\`\` a command that when used will check the guild's member according to the configuration (currently broken)
        \`\`/checkconfig:\`\` a command that allows a guild's admin to check the current guild's configuration`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        const embed_main = new MessageEmbed()
        .setTitle(`**Informations**`)
        .setDescription(`Bot Mention: ${client.user}         Developer: Ascynx#2020\n
        To check a command page press the according button`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        if (interaction.user.id == interactioncreator) {
        if(interaction.customId == `info main`) {
            interaction.update({embeds: [embed_main]})
        } else if (interaction.customId == `info moderation`) {
            interaction.update({embeds: [embed_moderation]})
        } else if (interaction.customId == `info context`) {
            interaction.update({embeds: [embed_context]})
        } else if (interaction.customId == `info hypixel`) {
            interaction.update({embeds: [embed_hypixel]})
        } else if (interaction.customId == `info config`) {
            interaction.update({embeds: [embed_config]})
        } else {
            return interaction.reply({content: `error: the interaction received doesn't match any resolvable interactions`, ephemeral:true})
        }
    } else {
        return interaction.reply({content: `You don't have permission to use this interaction`,ephemeral: true});
    }
    }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        const cmd = command
        if (cmd.invisible) {
            await interaction.deferReply({ ephemeral: true });
        } else {
            await interaction.deferReply({ ephemeral: false });
        }



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