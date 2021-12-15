const { Message, Client, MessageEmbed } = require("discord.js");
const d = require("../../personal-modules/discordp");
module.exports = {
  name: "exec",
  aliases: ["eval", "ev", "e", "ex", "execute", "evaluate"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const token = client.config.token;
    let mongooseConnectionString = client.config.mongooseConnectionString;
    const hypixelapikey = client.config.hypixelapikey;
    const logwb = client.config.logwb;

    const clean = async (text) => {
      if (text && text.constructor.name == "Promise") text = await text;

      if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });

      // Replace symbols with character code alternatives
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));

      // Send off the cleaned up result
      return text;
    };
    c = function (text) {
      let length = text.length;
      length = length - 998;
      text = text.slice(0, 998);
      text = text.concat(`\n${length} characters left\n\`\`\``);
      return text;
    };

    try {
      let Cregexp = /client\.config\.?/gim;
      let s = /.?(logwb|hypixelapikey|token|mongooseConnectionString).?/gim;
      let r = Cregexp.test(args.join(" "));
      if (r === true) throw Error("not happening m8");
      r = s.test(args.join(" "));
      if (r === true) throw Error("not happening m8");
      evaled = eval(args.join(" "));
      let cleaned = await clean(evaled);
      cleaned = cleaned.replace(
        new RegExp(
          [token, mongooseConnectionString, hypixelapikey, logwb].join("|"),
          "gi"
        ),
        "[REDACTED]"
      );
      let cool = args.join(" ");
      if (cool.includes("client") && cool.includes("config"))
        throw Error("nope");
      cool = `\`\`\`js\n ${cool}\n\`\`\``;
      cleaned = `\`\`\`js\n ${cleaned}\n\`\`\``;

      if (cool.length > 1000) cool = c(cool);
      if (cleaned.length > 1000) cleaned = c(cleaned);

      const embed = new MessageEmbed()
        .setFields([
          { name: "**input:**", value: cool },
          { name: "**output:**", value: cleaned },
        ])
        .setAuthor("Success ✅");

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      let cool = args.join(" ");
      cool = `\`\`\`js\n${cool}\n\`\`\``;
      err = `\`\`\`\n${err}\n\`\`\``;
      if (cool.length > 1000) cool = c(cool);
      if (err.length > 1000) err = c(err);
      const embed = new MessageEmbed()
        .setFields([
          { name: "**input:**", value: cool },
          { name: "**output:**", value: err },
        ])
        .setAuthor("Error ❌");
      message.channel.send({ embeds: [embed] });
    }
  },
};
