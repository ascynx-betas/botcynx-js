const { Message, Client } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "timeout",
  aliases: ["t"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let target = args[0];
    let time = args[1];
    let reason = args.slice(2).join(" ");
    time = ms(time);
    if (typeof time != "number" || time === null)
      return message.reply("Error while executing the command");
    message.guild.members.cache
      .get(target.slice(3, target.length - 1))
      .timeout(time, reason || "reason not provided")
      .then((result) => message.reply(`success, timed out ${target}`));
  },
};
