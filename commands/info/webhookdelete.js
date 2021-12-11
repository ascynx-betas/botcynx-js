const { Message, Client } = require("discord.js");

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
      let link = args[0];
      const param = args[1];
      if (!link) return message.reply({ content: `missing webhook link` });
      link = link.slice(8, link.length);
      let fields = link.split("/");
      if (fields[2] != "webhooks")
        return message.reply({ content: `link provided isn't a webhook` });
      const wbtoken = fields[4];
      const wbid = fields[3];
      const info = wbid + "/" + wbtoken;
      const webhook = await client.fetchWebhook(info);
      if (param == "-s") {
        webhook.send({
          content: `lmao bye`,
          username: `${message.author.tag}`,
          avatarURL: message.author.displayAvatarURL({ dynamic: true }),
        });
      }
      webhook.delete("lmfao nice").then(() => {
        message.reply({
          content: `✅ successfully deleted ${webhook.name}/guild: ${webhook.guildId}`,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
};
