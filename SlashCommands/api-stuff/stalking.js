const { Command } = require('reconlx');
const slothpixel = require('../../personal-modules/slothpixel.js');
const hypixel = require('../../personal-modules/hypixel.js')
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

            if (ign.length < 3) {
                interaction.followUp({content: `Hmmm, sus is a 3 character word and 3 is the minimum number of character in a minecraft username but the one you tried to enter is shorter than that, nice try though.`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
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
            const uuid = await slothpixel.getuuid(ign).catch(() => (`failed to fetch uuid`))
            const data = await hypixel.getStatus(uuid).catch(`failed to fetch data`)


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


            if (discord === null || data.session.online === null) {
                interaction.followUp({content: `Player not found`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
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
                    interaction.followUp({content: `${ign} is currently ${on} \n in Skyblock in ${gamemodetranslated} `}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                } else if (typeof gametype == 'undefined') {
                    //if offline? // if in appear offline status
                    interaction.followUp({content: `${ign} appears to be offline`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                    return;
                } else {
                    //if in other gamemodes than skyblock
                    interaction.followUp({content: `${ign} is currently ${on} \n is in ${gametype} in the gamemode ${gamemode} `}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                }
                return;
            } else {
                //if there is a map, probably for skywars, bedwars and games like that // not sure what gamemap is used for tho
                interaction.followUp({content: `${ign} is currently ${on}\n in the game ${gametype} in the gamemode ${gamemode}\n in ${map} `}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            }




            }

    }

})

//to add
//get from api last logout + last login
//detect if online and return the time they've been online or since when they've been offline
// finished to get from the hypixel api to avoid it not being correct