const { Message, Client } = require("discord.js");

module.exports = {
  name: "move",
  aliases: ["m"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let channelfrom = args[0];
    let channelto = args[1];
    //18 characters if id
    //21 characters if mention
    if (channelfrom.length !== 21 && channelfrom.length !== 18)
      return message.channel
        .send({ content: `argument 1 is not a channel` })
        .catch(() => console.log(`cannot speak in current channel`));
    if (channelto.length !== 21 && channelto.length !== 18)
      return message.channel
        .send({ content: `argument 2 is not a channel` })
        .catch(() => console.log(`cannot speak in current channel`));
    if (channelfrom.length == 21) {
      channelfrom.slice(3, channelfrom.length - 1);
    }
    if (channelto.length == 21) {
      channelto.slice(3, channelto.length - 1);
    }

    const channelf = client.channels.cache.get(channelfrom);
    const channelt = client.channels.cache.get(channelto);
    if (channelf.isVoice() === false || channelt.isVoice() === false)
      return message.channel
        .send({ content: `channel provided isn't a voice channel` })
        .catch(() => console.log(`cannot speak in current channel`));
    const members = channelf.members;
    members.forEach(function (members) {
      members.voice.setChannel(channelt).catch(() => console.log());
    });
    message.channel.send({
      content: `successfully moved users from ${channelf} to channel ${channelt}`,
    });
  },
};
