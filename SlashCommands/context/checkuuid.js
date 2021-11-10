const hypixel = require('../../personal-modules/hypixel');
const verifyModel = require('../../models/verifymodel');


module.exports = {
    name: 'getuuid',
    type: 'USER',
    devonly: true,

    run: async (client, interaction, args) => {
        try {
        const user = await client.users.fetch(interaction.targetId);
        const userId = user.id

        const userInfo = await verifyModel.find({
            userId: userId
        });
        const info = userInfo[0]

            if(!userInfo?.length) return interaction.followUp({content: `the user isn't verified`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
            const uuid = info.minecraftuuid
        if (typeof uuid !== 'undefined') {
        const data = await hypixel.getPlayerByUuid(uuid).catch(console.log)
        const username = data.player.displayname;

        return interaction.followUp({content: `${user}\'s username is ${username}`, ephemeral: true}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`));
        } else {
            return interaction.followUp({content:` couldn't fetch uuid`})
        }

    }catch (err) {console.log(err)}
    }
}
