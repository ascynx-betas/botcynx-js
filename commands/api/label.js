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
        const target = (args[0]);
        const label = args.slice(1).join(" ");
        var userId;
        var targetId;
            try {
        if(!target || typeof target === 'undefined') {
            return message.reply({content: `missing parameter target`})
        }
        if(!label || typeof label === 'undefined') {
            return message.reply({content: `missing label parameter`})
        }
        if (target.length === 21) {
            var targetId = target.slice(2, target.length-1)
        } else if (target.length === 22) {
            var targetId = target.slice(3, target.length-1)
        }
        if (targetId) {
            var userId = targetId
        } else if (target.length === 18) {
            var userId = target
        }
        var Info = await verifymodel.find({"userId": `${userId}`})
                    if (Info[0].labels.includes(label)) {
                        return message.channel.send({content: `<@${userId}> already has label`,allowedMentions: {parse :[]}})
                    } else {

                    
                verifymodel.updateOne(
                    {"userId": `${userId}`}, {$addToSet: {"labels": `${label}`}}, function(err, doc) {
                        if (err) return message.channel.send({content: `there was an error while trying to update values`});
                    }
                )
                message.channel.send({content: `✅ ${label} was added to <@${userId}>`,allowedMentions: {parse :[]}})
                    }
    }catch(err) {console.log(err)}

    },
};