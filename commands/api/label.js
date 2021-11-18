const { Message, Client } = require("discord.js");
const verifymodel = require(`../../models/verifymodel`)
module.exports = {
    name: "label",
    aliases: ['l'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        return message.channel.send({content: `this command is currently in developement and is not currently useable`})
        const target = (args[0]);
        const label = (args[1])
        var Info;
        var query;
        var update;
            try {
        if(!target) {
            return message.channel.send({content: `missing parameter target`})
        }
        if(!label) {
            return message.channel.send({content: `missing label parameter`})
        }

        if (target.length = 18) {
            //if discord id
            var Info = await verifymodel.find({
                userId: target
            });
            var query = {'userId': target}
        } else if (target.length = 32) {
            var Info = await verifymodel.find({
                minecraftuuid: target
            })
            var query = {'minecraftuuid': target}
        } else {
            return message.send({content: `the argument you provided isn't accepted`})
        }
        if (Info.labels != label) {
            var update = Info;
            update.labels = label
            console.log(label, Info, query)
            await verifymodel.findOneAndUpdate(query, Info, {upsert: true}, function(err, doc) {
                if (err) return channel.message.send(500, {error: err})
                return message.channel.send('successfully saved.')
            })
        } else {
            return message.send({content: `target already has label`})
        }
    }catch(er) {console.log(er)}

    },
};