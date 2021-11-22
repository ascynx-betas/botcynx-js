const { Message, Client, Webhook } = require("discord.js");

module.exports = {
  name: "webhook-delete",
  aliases: ["wd"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      var link = args[0];
      const param = args[1];
      if (!link) return message.reply({ content: `missing webhook link` });
      link = link.slice(8, link.length);
      var fields = link.split("/");
      if (fields[2] != "webhooks")
        return message.reply({ content: `link provided isn't a webhook` });
      const wbtoken = fields[4];
      const wbid = fields[3];
      const info = wbid + "/" + wbtoken;
      if (param == "-s") {
        client
          .fetchWebhook(info)
          .then((webhook) =>
            webhook.send({
              content: `you're an idiot`,
              username: `${message.author.tag}`,
              avatarURL: message.author.displayAvatarURL({ dynamic: true }),
            })
          )
          .catch(() => console.log());
      }
      client
        .fetchWebhook(info)
        .then((webhook) => webhook.delete("lmfao nice"))
        .catch(() => console.log());
      client
        .fetchWebhook(info)
        .then((webhook) =>
          message.reply({ content: `✅ successfully deleted ${webhook.name}` })
        )
        .catch(() => message.reply({ content: `❌ webhook doesn't exist` }));
    } catch (err) {
      console.log(err);
    }
  },
};
