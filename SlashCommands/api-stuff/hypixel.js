const { Command } = require('reconlx');
const slothpixel = require('../../personal-modules/slothpixel.js')
const hy = require('../../personal-modules/slothpixel.js')
const mojang = require('../../personal-modules/mojang')
const { MessageEmbed } = require('discord.js');
const verify = require('../../models/verifymodel')
module.exports = new Command ({
    name: 'hyinfo',
    description: 'send the user\'s uuid using the slothpixel api',
    options: [
        {
          name: 'username',
          description: 'the ign of the player',
          type:'STRING',
          required: false,
            
        }
    ],

    run: async ({ interaction }) => {
        try {
            var ign = interaction.options.getString('username');
            var on = ``;
            if (!ign) {
                const userId = interaction.user.id

                const userInfo = await verify.find({
                    userId: userId
                });
                const info = userInfo[0]

                if(!userInfo?.length) return interaction.followUp({content: `you're missing the username parameter`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                var uuid = info.minecraftuuid

            } else {

            if (ign.length < 3) {
                interaction.followUp({content: `if the username you're trying to search is less than 3 characters then L cos I'm not accepting those for buggy reasons`});
                return;
            }

            if (ign.length > 16 && ign.length != 32) {
                interaction.followUp({content: `a username cannot be longer than 16 characters.`});
                return;
            }
            if (ign.length == 32) {
                interaction.followUp({content: `I asked for a username not a uuid :(`});
                return;
            }
            }



             if (typeof uuid === 'undefined') {
                var uuid = await mojang.getUuidbyUsername(ign).catch(() => (`failed to fetch uuid`))
             } else {
            const data = await hy.getPlayerByUuid(uuid).catch(() => (`there was an error while trying to fetch the username`))
            var ign = data.player.displayname
            if (!ign) {
                return interaction.followUp({content: `it seems as though the player doesn't exist on the hypixel api`})
            }
             }

            const discord = await slothpixel.getDiscord(uuid).catch(() => (`there was an error while trying to fetch the discord tag`))
            const online = await slothpixel.getOnline(uuid).catch(() => (`there was an error while trying to fetch if the player is online`))



            //if not found 
            if (discord === null || uuid === null || online === null || ign === null) {
                interaction.followUp({content: `Player not found`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }

            if (online == true) {
                var on = `🟢`
            } else if (online == false) {
                var on = `🔴`
            } else {
                var on = (`there was an error while trying to fetch the activity`)
            }

            const embed = new MessageEmbed()
            .setTitle(`|WIP|informations about ${ign}`)
            .setColor(`BLURPLE`)
            .setDescription(`Username: \`\`${ign}\`\`\nUUID: \`\`${uuid.id}\`\`\nLinked discord account: \`\`${discord}\`\`\n online: ${on}`)
            .setFooter(`powered by slothpixel api`)
            .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)

            interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

        }catch(err){console.log(err)}

    }
})
//this command sucks