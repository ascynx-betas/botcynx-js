const { Message, Client } = require("discord.js");
const mongoose = require("mongoose");
const mp = require("../../personal-modules/testfor");

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
      console.log("mongoose connection is now severed");
      client.destroy();
      const time = mp.getTimeOfDay();
      console.log(`[${time}] client is now offline`);
    });
  },
};
