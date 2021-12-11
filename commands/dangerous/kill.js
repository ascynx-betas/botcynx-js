const { Message, Client } = require("discord.js");
const mongoose = require("mongoose");
const mp = require("../../personal-modules/testfor");
const readline = require("readline");

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
    message.reply({
      content: `https://tenor.com/view/thanos-avengers-dust-dissolve-gif-16965356`,
    });
    message.channel.send({ content: `killing bot, please a bit` }).then(() => {
      console.log(`\nkill command was used`);
      mongoose.disconnect();
      console.log("mongoose connection is now severed");
      client.destroy();
      const time = mp.getTimeOfDay();
      console.log(`[${time}] client is now offline`);
      process.kill(process.pid, "SIGHUP");
    });
  },
};
