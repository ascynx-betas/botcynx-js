const { Command } = require('reconlx');
const verifyModel = require('../../models/verifymodel')
const hypixel = require('../../personal-modules/hypixel.js');
const slothpixel = require('../../personal-modules/slothpixel.js');

module.exports = new Command ({
    name: 'verify',
    description: 'verifies the user into the database',
    devonly: true,
    options: [
        {
            name: 'username',
            description: 'the minecraft username',
            type: 'STRING',
            required: true,

        }
    ],

    run: async ({ interaction }) => {
        const ign = interaction.options.getString('username');

        const user = interaction.user
        const usertag = interaction.user.tag;
        const userId = interaction.user.id

        if (ign.length < 3) {
            interaction.followUp({content: `Hmmm, sus is a 3 character word and 3 is the minimum number of character in a minecraft username but the one you tried to enter is shorter than that, nice try though.`});
            return;
        }

        if (ign.length > 16 && ign.length != 32 && ign.length != 36) {
            interaction.followUp({content: `a username cannot be longer than 16 characters.`});
            return;
        }
        if (ign.length == 32 || ign.length == 36) {
            interaction.followUp({content: `I asked for a username not a uuid :(`});
            return;
        }

        const linkedtag = await slothpixel.getDiscord(ign).catch(() => (`there was an error while trying to fetch the discord tag`));
            const minecraftuuid = await slothpixel.getuuid(ign).catch(() => (`failed to fetch uuid`))

            const userInfo = await verifyModel.find({
                userId: userId
            });


            if(userInfo.length > 0) return interaction.followUp({content: `that user is already verified`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            if ( usertag == linkedtag) {


                new verifyModel({
                    userId: user.id,
                    minecraftuuid
                }).save();

                interaction.followUp({content: `added ${user.tag} as ${ign} to database`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

            } else if (linkedtag == 'there was an error while trying to fetch the discord tag') {
                interaction.followUp({content: `the account either has no specified account or the username you provided is wrong`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))

            } else {
                interaction.followUp({content: ` discord account is not linked to the specified minecraft account `}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                return;
            }
    }
})