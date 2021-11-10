const hypixel = require('../../personal-modules/hypixel');
const verifyModel = require('../../models/verifymodel');


module.exports = {
    name: 'getuuid',
    type: 'USER',
    devonly: true,

    run: async (client, interaction, args) => {
        const user = await client.users.fetch(interaction.targetId);
        const userId = user.id

        const userInfo = await verifyModel.find({
            userId: userId
        });


        if(!userInfo?.length) return interaction.followUp({content: `the user isn't verified`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))


        const data = await hypixel.getPlayerByUuid(verify.minecraftuuid).catch(() => console.log)
        const username = data.player.displayname
        interaction.followUp({content: `${verify.userId}\'s username is ${username}`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))


    }
}