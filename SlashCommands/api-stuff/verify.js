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
        const linkedtag = await slothpixel.getDiscord(ign).catch(() => (`there was an error while trying to fetch the discord tag`));
            const minecraftuuid = await slothpixel.getuuid(ign).catch(() => (`failed to fetch uuid`))


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