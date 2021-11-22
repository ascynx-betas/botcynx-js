const { Message, Client } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  name: "kill",
  aliases: ["destroy", "k", "d"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.reply({ content: `killing bot, please a bit` }).then(() => {
      console.log(`kill command was used`);
      mongoose.disconnect();
      client.destroy();
      console.log(`client is now offline`);
    });
  },
};
