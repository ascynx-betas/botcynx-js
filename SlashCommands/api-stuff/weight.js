const { Command } = require('reconlx');
const senither = require('../../personal-modules/senither')
const slothpixel = require('../../personal-modules/slothpixel')
const hypixel = require('../../personal-modules/hypixel')
const verify = require ('../../models/verifymodel')

module.exports = new Command ({
    name: 'test',
    description: 'command used to test the senither api (currently only su or above)',
    devonly: true,
    options: [
        {
            name: 'username',
            description: 'the user you want the see the profiles of',
            required: false,
            type: 'STRING',
        }
    ],

    run: async ({ interaction }) => {
        var ign = interaction.options.getString('username');
        var profilenames = [""];

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
        var uuid = await slothpixel.getuuid(ign).catch(() =>  (`there was an error while trying to fetch the uuid`))
         } else {
            const data = await hypixel.getPlayerByUuid(uuid).catch(() => (`there was an error while trying to fetch the username`))
            var ign = data.player.displayname    
         }

         const profiles = await senither.getProfiles(uuid).catch(() => console.log())
         const dataprofile = profiles.data
         dataprofile.forEach(function(data){
            var profilename = data.name
            profilenames.splice(0, 0, profilename)
         })
         interaction.followUp({content: `${ign}'s profiles are ${profilenames.toString()}`});
    }
})