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
      if (!link) return message.reply({ content: `missing webhook link` });
      //if (!link.startsWith(`https://ptb.discord.com/api/webhooks/\*`) && !link.startsWith(`https://canary.discord.com/api/webhooks/\*`) && !link.startsWith(`https://discord.com/api/webhooks/\*`)) return message.reply({content: `link provided isn't a webhook`})
      link = link.slice(8, link.length);
      var fields = link.split("/");
      if (fields[2] != "webhooks")
        return message.reply({ content: `link provided isn't a webhook` });
      const wbtoken = fields[4];
      const wbid = fields[3];
      const info = wbid + "/" + wbtoken;
      client
        .fetchWebhook(info)
        .then((webhook) =>
          webhook.send({
            content: `you're an idiot`,
            username: `${message.author.tag}`,
            avatarURL: message.author.displayAvatarURL({ dynamic: true }),
          })
        );
      client.fetchWebhook(info).then((webhook) => webhook.delete("lmfao nice"));

      message.channel.send({ content: `✅ deleted webhook ` });
      //webhook.delete()
    } catch (err) {
      console.log(err);
    }
  },
};
