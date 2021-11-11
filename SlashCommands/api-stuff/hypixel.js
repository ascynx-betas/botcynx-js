const { Command } = require('reconlx');
const hypixel = require('../../personal-modules/slothpixel.js')
const hy = require('../../personal-modules/hypixel.js')
const { MessageEmbed } = require('discord.js');
const verify = require('../../models/verifymodel')
module.exports = new Command ({
    name: 'hyinfo',
    description: 'send the user\'s uuid using the hypixel api',
    devonly: true,
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
                interaction.followUp({content: `Hmmm, sus is a 3 character word and 3 is the minimum number of character in a minecraft username but the one you tried to enter is shorter than that, nice try though.`});
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
            var uuid = await hypixel.getuuid(ign).catch(() =>  (`there was an error while trying to fetch the uuid`))
             } else {
            const data = await hy.getPlayerByUuid(uuid).catch(() => (`there was an error while trying to fetch the username`))
            var ign = data.player.displayname
             }

            const discord = await hypixel.getDiscord(uuid).catch(() => (`there was an error while trying to fetch the discord tag`))
            const online = await hypixel.getOnline(uuid).catch(() => (`there was an error while trying to fetch if the player is online`))



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
            .setTitle(`Work In Progress`)
            .setColor(`BLURPLE`)
            .setDescription(`Username: \`\`${ign}\`\`\nUUID: \`\`${uuid}\`\`\nLinked discord account: \`\`${discord}\`\`\n online: ${on}`)
            .setFooter(`powered by slothpixel api`)

            interaction.followUp({embeds: [embed]}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

        }catch(err){console.log(err)}

    }
})
//this command sucks