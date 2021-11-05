const { Command } = require('reconlx');
const hypixel = require('../../personal-modules/hypixel.js')
module.exports = new Command ({
    name: 'hypixel',
    description: 'send the user\'s uuid using the hypixel api',
    devonly: true,
    options: [
        {
          name: 'ign',
          description: 'the ign of the player',
          type:'STRING',
          required: true,
            
        }
    ],

    run: async ({ interaction }) => {
        try {
            const ign = interaction.options.getString('ign');

            if (ign.length < 3) {
                interaction.followUp({content: `hmmmm, sus is a 3 character word, but the username you're trying to enter is shorter than that, and I can't allow it`});
                return;
            }

            if (ign.length > 16) {
                interaction.followUp({content: `an ign cannot be longer than 16 characters, you mad bro`});
                return;
            }


            const discord = await hypixel.getDiscord(ign);

            const uuid = await hypixel.getuuid(ign);

            if (discord === null) {
                interaction.followUp({content: `Player not found`});
                return;
            }

            if (uuid === null) {
                interaction.followUp({content: `Player not found`});
                return;
            }

            interaction.followUp({content: `username: ${ign}\n uuid: \`\`${uuid}\`\`\nlinked discord: ${discord}`});

        }catch(err){console.log(err)}

    }
})