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
                interaction.followUp({content: `Player not found`});
                return;
            }

            if (typeof map == 'undefined') {
                if (gametype == 'SKYBLOCK') {
                    //if in skyblock
                    interaction.followUp({content: `player is currently ${on} \n in ${gametype} in ${gamemode} `})
                } else if (typeof gametype == 'undefined') {
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
                interaction.followUp({content: `player is currently ${on}\n in the game ${gametype} in the gamemode/map(if skyblock) ${gamemode}\n in ${map} `})
            }




            }

    }

})

//to add
//get from api last logout + last login
//detect if online and return the time they've been online or since when they've been offline
// finished to get from the hypixel api to avoid it not being correct