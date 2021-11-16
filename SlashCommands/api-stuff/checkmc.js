const hypixel = require('../../personal-modules/hypixel');
const verifyModel = require('../../models/verifymodel');
const { Command } = require('reconlx')

module.exports = new Command ({
    name: 'dbcheck',
    description: 'get the minecraft username of the person from the database',
    options: [
        {
            name: 'target',
            description: 'the discord of the person',
            type: 'USER',
            required: true,
        }
    ],

    run: async ({ interaction }) => {
        try {
        const user = interaction.options.getUser('target');
        const userId = user.id

        const userInfo = await verifyModel.find({
            userId: userId
        });
        const info = userInfo[0]

            if(!userInfo?.length) return interaction.followUp({content: `the user isn't verified, tell them to use /verify`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            const uuid = info.minecraftuuid
        if (typeof uuid !== 'undefined') {
        const data = await hypixel.getPlayerByUuid(uuid).catch(console.log)
        const username = data.player.displayname;
        if (info.labels.length > 0) {   
            const labellist = info.labels
            var labels = [""];
            var editvalue = 0;
            labellist.forEach(function(labellist){

                labels.splice(editvalue, 0, labellist);
                editvalue += 1;
            })
                return interaction.followUp({content: `${user.tag}\'s username is \`\`${username}\`\` and has the label(s) ${labels}`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`));
        }else {
            return interaction.followUp({content: `${user.tag}\'s username is \`\`${username}\`\``, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`));
            }
        } else {
            return interaction.followUp({content:` couldn't fetch uuid`})
        }

    }catch (err) {console.log(err)}
    }
});

/**
 * when dealing with mongodb databases using mongoose, if you want to get informations that you wrote outside of addition, you need to have them in the model
 */
