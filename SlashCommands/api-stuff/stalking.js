const { Command } = require('reconlx');
const slothpixel = require('../../personal-modules/slothpixel.js');
const hypixel = require('../../personal-modules/hypixel.js')
const mojang = require('../../personal-modules/mojang')
const { MessageEmbed } = require('discord.js');

module.exports = new Command ({
    name: 'stalk',
    description: 'Allows to see the activity of a user on hypixel',
    options: [
        {
            name: 'username',
            description: 'the username of the person you want to stalk',
            required: true,
            type: 'STRING',
        }
    ],

    run: async ({ interaction}) => {
            const ign = interaction.options.getString('username');
            var on = ``;
        try {
            if (ign.length < 3) {
                interaction.followUp({content: `if the username you're trying to search is less than 3 characters then L cos I'm not accepting those for buggy reasons`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }

            if (ign.length > 16 && ign.length != 32) {
                interaction.followUp({content: `a username cannot be longer than 16 characters.`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }
            if (ign.length == 32) {
                interaction.followUp({content: `I asked for a username not a uuid :(`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            }


            const discord = await slothpixel.getDiscord(ign).catch(() => (`there was an error while trying to fetch the discord tag`));
            const uuid = await mojang.getUuidbyUsername(ign).catch(() => (`failed to fetch uuid`))
            if (uuid == `failed to fetch uuid`) {
                const description = `Player not found`
                const embed = new MessageEmbed()
                .setDescription(description)
                .setTitle(`error: player does not exist`)
                .setThumbnail(`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F04%2F02%2F10%2F44%2Fcross-mark-304374_640.png&f=1&nofb=1`)
                interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }
            const check = await slothpixel.getPlayer(uuid.name).catch(() => (`failed to fetch player`))
            if (check == `failed to fetch player`) {
                const description = `${uuid.name} never logged into mc.hypixel.net`
                const embed = new MessageEmbed()
                .setDescription(description)
                .setTitle(`error: couldn't get status information`)
                .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
                interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }
            const data = await hypixel.getStatus(uuid.id).catch(`failed to fetch data`)


            if (data.session != null) {
            const gametype = data.session.gameType
            const gamemode = data.session.mode
            const map = data.session.map
            

            if (data.session.online == true) {
                var on = `🟢`
            } else if (data.session.online == false) {
                var on = `🔴`
            } else {
                var on = (`there was an error while trying to fetch the activity`)
            }


            if (discord === null || data.session.online === null || data.success == false) {
                const description = `\`\`${ign}\`\` never logged on hypixel.net`
                const embed = new MessageEmbed()
                .setDescription(description)
                .setTitle(`error: couldn't get status information`)
                .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
                interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }

            if (typeof map == 'undefined') {
                if (gametype == 'SKYBLOCK') {
                    //if in skyblock

                    //translate skyblock island ids into island names
                    if (gamemode == 'combat_3') {
                        var gamemodetranslated = 'The End'
                    } else if (gamemode == 'dynamic') {
                        var gamemodetranslated = 'private island'
                    } else if (gamemode == 'combat_2') {
                        var gamemodetranslated = 'blazing fortress'
                    }else if (gamemode == 'combat_2') {
                        var gamemodetranslated = 'spider\'s den'
                    }else if (gamemode == 'hub') {
                        var gamemodetranslated = 'the hub'
                    }else if (gamemode == 'foraging_1') {
                        var gamemodetranslated = 'the park'
                    }else if (gamemode == 'mining_1') {
                        var gamemodetranslated = 'the gold mines'
                    }else if (gamemode == 'mining_2') {
                        var gamemodetranslated = 'deep caverns'
                    }else if (gamemode == 'mining_3') {
                        var gamemodetranslated = 'dwarven mines'
                    }else if (gamemode == 'crystal_hollows') {
                        var gamemodetranslated = 'the crystal Hollows'
                    }else if (gamemode == 'dungeon_hub') {
                        var gamemodetranslated = 'the dungeon hub'
                    }else if (gamemode == 'farming_1') {
                        var gamemodetranslated = 'the farming islands'
                    }else if (gamemode == 'dungeon') {
                        var gamemodetranslated = 'dungeons'
                    }else {
                        var gamemodetranslated = 'not currently coded in'
                        console.log(gamemode)
                    }   
                        const description = `\`\`${uuid.name}\`\` is currently ${on} \n in Skyblock in ${gamemodetranslated}`
                    const embed = new MessageEmbed()
                        .setAuthor(`${uuid.name}`)
                        .setDescription(description)
                        .setFooter(`powered by hypixel api`)
                        .setColor(`RANDOM`)
                        .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
                    interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                } else if (typeof gametype == 'undefined') {
                        const description = `\`\`${uuid.name}\`\` appears to be offline`
                    const embed = new MessageEmbed()
                        .setAuthor(`${uuid.name}`)
                        .setDescription(description)
                        .setFooter(`powered by hypixel api`)
                        .setColor(`RANDOM`)
                        .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
                    //if offline? // if in appear offline status
                    interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                    return;
                } else {
                        const description = `\`\`${uuid.name}\`\` is currently ${on} \n is in ${gametype} in the gamemode ${gamemode}`
                    const embed = new MessageEmbed()
                    .setAuthor(`${uuid.name}`)
                    .setDescription(description)
                    .setFooter(`powered by hypixel api`)
                    .setColor(`RANDOM`)
                    .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
                    //if in other gamemodes than skyblock
                    interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                }
                return;
            } else {
                    const description = `\`\`${uuid.name}\`\` is currently ${on}\n in the game ${gametype} in the gamemode ${gamemode}\n in ${map}`
                const embed = new MessageEmbed()
                    .setAuthor(`${uuid.name}`)
                    .setDescription(description)
                    .setFooter(`powered by hypixel api`)
                    .setColor(`RANDOM`)
                    .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
                //if there is a map, probably for skywars, bedwars and games like that // not sure what gamemap is used for tho
                interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            }




            }
        }catch(err) {console.log(err)}

    }

})

//to add
//get from api last logout + last login
//detect if online and return the time they've been online or since when they've been offline