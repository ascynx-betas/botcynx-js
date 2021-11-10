const { Command } = require('reconlx');
const slothpixel = require('../../personal-modules/slothpixel.js');
const hypixel = require('../../personal-modules/hypixel.js')
const { MessageEmbed } = require('discord.js');

module.exports = new Command ({
    name: 'stalk',
    description: 'Allows to see the activity of a user on hypixel',
    devonly: true,
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
                interaction.followUp({content: `Hmmm, sus is a 3 character word and 3 is the minimum number of character in a minecraft username but the one you tried to enter is shorter than that, nice try though.`});
                return;
            }

            if (ign.length > 16 && ign.length != 32) {
                interaction.followUp({content: `a username cannot be longer than 16 characters.`});
                return;
            }
            if (ign.length == 32) {
                interaction.followUp({content: `I asked for a username not a uuid :(`})
            }


            const discord = await slothpixel.getDiscord(ign).catch(() => (`there was an error while trying to fetch the discord tag`));
            const online = await slothpixel.getOnline(ign).catch(() => (`there was an error while trying to fetch the player's status`));
            const status = await slothpixel.getOnlineActivity(ign).catch(() => (`failed to fetch activity`));
            const uuid = await slothpixel.getuuid(ign).catch(() => (`failed to fetch uuid`));
            const experimental = await hypixel.getKeyInformation().catch(`failed to fetch experimental`);
            console.log(experimental)
            if (status != null) {
            const gametype = status.game.type
            const gamemap = status.game.map
            const gamemode = status.game.mode

            if (online == true) {
                var on = `🟢`
            } else if (online == false) {
                var on = `🔴`
            } else {
                var on = (`there was an error while trying to fetch the activity`)
            }


            if (discord === null || online === null) {
                interaction.followUp({content: `Player not found`});
                return;
            }


        
            if (gamemap === null) {
                if (gametype == 'SkyBlock') {
                    //if in skyblock
                    interaction.followUp({content: `player is currently ${on} \n in ${gametype} in ${gamemode} `})
                } else if (gametype === null) {
                    //if offline?
                    interaction.followUp({content: `${ign} is currently offline`})
                    return;
                } else {
                    //if in other gamemodes than skyblock
                    interaction.followUp({content: `player is currently ${on} \n is in ${gametype} in the gamemode ${gamemode} `})
                }
                return;
            } else {
                //if there is a map, probably for skywars, bedwars and games like that
                interaction.followUp({content: `player is currently ${on}\n in the game ${gametype} in the gamemode/map(if skyblock) ${gamemode}\n in ${gamemap} `})
            }





            }

    }

})

//to add
//get from api last logout + last login
//detect if online and return the time they've been online or since when they've been offline