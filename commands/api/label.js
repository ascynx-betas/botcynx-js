const { Message, Client } = require("discord.js");
const verifymodel = require(`../../models/verifymodel`);
module.exports = {
  name: "label",
  aliases: ["l"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const target = args[0];
    let label = args.slice(1).join(" ");
    let userId;
    let targetId;
    let param;
    let test;
    try {
      if (!target || typeof target === "undefined") {
        return message.reply({ content: `missing parameter target` });
      }
      if (!label || typeof label === "undefined") {
        return message.reply({ content: `missing label parameter` });
      }
      if (label.includes("-n")) {
        test = label.replace("-n", "");
        param = "no-msg";
        if (test.endsWith(" ")) {
          test = test.slice(0, test.length - 1);
        }
        label = test;
      }
      if (label.endsWith(" ")) {
        label = label.slice(0, test.length - 1);
      }
      if (target.length === 21) {
        let targetId = target.slice(2, target.length - 1);
      } else if (target.length === 22) {
        let targetId = target.slice(3, target.length - 1);
      }
      if (targetId) {
        let userId = targetId;
      } else if (target.length === 18) {
        let userId = target;
      }
      let Info = await verifymodel.find({ userId: `${userId}` });
      if (typeof Info[0] === "undefined") {
        return message.reply({ content: `user is not verified` });
      }
      if (Info[0].labels.includes(label)) {
        return message.channel.send({
          content: `<@${userId}> already has label`,
          allowedMentions: { parse: [] },
        });
      } else {
        verifymodel.updateOne(
          { userId: `${userId}` },
          { $addToSet: { labels: `${label}` } },
          function (err, doc) {
            if (err)
              return message.channel.send({
                content: `there was an error while trying to update values`,
              });
          }
        );
        if (param) {
          if (param == "no-msg") {
            return;
          } else {
            message.reply({
              content: `✅ ${label} was added to <@${userId}>`,
              allowedMentions: { parse: [] },
            });
          }
        } else {
          message.reply({
            content: `✅ ${label} was added to <@${userId}>`,
            allowedMentions: { parse: [] },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
