const { Message, Client } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (args.length > 0) console.log(this_is_to_error)
    message.channel.send(`${client.ws.ping} ws ping`);
  },
};
