const { Command } = require('reconlx');
const senither = require('../../personal-modules/senither')
const slothpixel = require('../../personal-modules/slothpixel')
const hypixel = require('../../personal-modules/hypixel')
const verify = require ('../../models/verifymodel')
const { MessageEmbed } = require('discord.js')

module.exports = new Command ({
    name: 'weight',
    description: 'check a user\'s weight using this command',
    options: [
        {
            name: 'username',
            description: 'the user you want the see the profiles of',
            required: false,
            type: 'STRING',
        },
        {
            name: 'profile',
            description: 'the profile you want to see the weight of',
            required: false,
            type: 'STRING',
        }
    ],

    run: async ({ interaction }) => {
        var ign = interaction.options.getString('username');
        var speprofile = interaction.options.getString('profile')
        var profile;
        //var profilenames = [""];
        try {
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
        var uuid = await slothpixel.getuuid(ign).catch(() =>  (`there was an error while trying to fetch the uuid`))
         } else {
            const data = await hypixel.getPlayerByUuid(uuid).catch(() => (`there was an error while trying to fetch the username`))
            var ign = data.player.displayname    
         }

         //const profiles = await senither.getProfiles(uuid).catch(() => console.log())
         //if (typeof profiles === 'undefined') {
             //return interaction.followUp({content: `player not found`});
         //}
         if (speprofile) {
                const lowercase = speprofile.toLowerCase()
                const uppercase = lowercase[0].toUpperCase()
                const without = lowercase.substr(1, speprofile.length)
                speprofile = uppercase + without
              if (speprofile != 'Apple' &&
                  speprofile != 'Banana' &&
                  speprofile != 'Blueberry' &&
                  speprofile != 'Coconut' &&
                  speprofile != 'Cucumber' &&
                  speprofile != 'Grapes' &&
                  speprofile != 'Kiwi' &&
                  speprofile != 'Lemon' &&
                  speprofile != 'Lime' &&
                  speprofile != 'Mango' &&
                  speprofile != 'Orange' &&
                  speprofile != 'Papaya' &&
                  speprofile != 'Pear' &&
                  speprofile != 'Pineapple' &&
                  speprofile != 'Pomegranate' &&
                  speprofile != 'Raspberry' &&
                  speprofile != 'Strawberry' &&
                  speprofile != 'Tomato' &&
                  speprofile != 'Watermelon' &&
                  speprofile != 'Zucchini'
                  ) {
                    return interaction.followUp({content: `The profile name doesn't seem to match the possible profile names\nif you feel like that's an error please contact the developer.`})
                  }
             var profile = await senither.getSpecifiedProfile(uuid, speprofile).catch(() => console.log())
             if (typeof profile === 'undefined' || !profile) {
                 return interaction.followUp({content: `player not found or profile provided doesn't exist`})
             }
         } else {

         var profile = await senither.getFatterProfile(uuid).catch(() => console.log())
         if (typeof profile === 'undefined' || !profile) {
            return interaction.followUp({content: `player not found or profile doesn't exist`});
         }
        }
         //const dataprofiles = profiles.data
         //dataprofiles.forEach(function(data){
            //var profilename = data.name
            //profilenames.splice(0, 0, profilename)
         //})
            
            const dataprofile = profile.data;
            //profile infos
            if (!dataprofile || !dataprofile.dungeons || !dataprofile.slayers.weight || dataprofile.skills.apiEnabled == false) {
                return interaction.followUp({content: `couldn't fetch weight, please check if you have your api on, https://sky.shiiyu.moe/resources/video/enable-api.webm`})
            }
                const profilename = dataprofile.name;
                const skillweight = dataprofile.skills.weight;
                const skilloweight = dataprofile.skills.weight_overflow;
                const slayerweight = dataprofile.slayers.weight;
                const slayeroweight = dataprofile.slayers.weight_overflow;
                const dungeonweight = dataprofile.dungeons.weight;
                const dungeonoweight = dataprofile.dungeons.weight_overflow;


            //calculations
                const fdungeonweight = dungeonweight + dungeonoweight;
                const fullskillweight = skillweight + skilloweight;
                const fullslayerweight = slayerweight + slayeroweight;
                const fullweight = fdungeonweight + fullskillweight + fullslayerweight;

            //rounded calculations
                const rskill = Math.round(skillweight * 10)/10;
                const roskill = Math.round(skilloweight * 10)/10;
                const rslayer = Math.round(slayerweight * 10)/10;
                const roslayer = Math.round(slayeroweight * 10)/10;
                const rdungeon = Math.round(dungeonweight * 10)/10;
                const rodungeon = Math.round(dungeonoweight * 10)/10;
                const rfskill = Math.round(fullskillweight * 10)/10;
                const rfslayer = Math.round(fullslayerweight * 10)/10;
                const rfdungeon = Math.round(fdungeonweight * 10)/10;
                const rf = Math.round(fullweight * 10)/10;

        //embed
        const embed = new MessageEmbed()
        .setDescription(`Total weight is **\`\`${rf}\`\`**\n
        dungeon weight is \`\`${rfdungeon}\`\`(\`\`${rdungeon}\`\`/\`\`${rodungeon}\`\` overflow)
        slayer weight is \`\`${rfslayer}\`\`(\`\`${rslayer}\`\`/\`\`${roslayer}\`\` overflow)
        skill weight is \`\`${rfskill}\`\`(\`\`${rskill}\`\`/\`\`${roskill}\`\` overflow)`)
        .setFooter(`powered by senither api`)
        .setColor(`RED`)
        .setAuthor(`${ign}'s Weight`,``, `https://sky.shiiyu.moe/stats/${ign}/${profilename}`)
        .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`)
        .setTitle(`profile: **\`\`${profilename}\`\`** username: **\`\`${ign}\`\`**`)

            //output
         interaction.followUp({embeds: [embed]}).catch(() => console.log())
        }catch (err) {console.log(err)}
    }
})

/**
 * the commands in comments are legacy and are only here to debug
 */