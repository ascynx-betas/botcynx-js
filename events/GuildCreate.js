const fs = require("fs");
const client = require("../index");
const logchannel = "903281241594413176";
const { MessageEmbed } = require("discord.js");
const configmodel = require("../models/config");
const mp = require("../personal-modules/testfor");

client.on("guildCreate", (guild) => {
  try {
    const embed = new MessageEmbed()
      .setTitle("Joined Server")
      .addField(
        "Guild Info",
        `${guild.name} (${guild.id})\n ${guild.membercount} members`
      )
      .setFooter(`Now in ${client.guilds.cache.size} guilds`)
      .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor("GREEN");
    client.channels.cache.get(logchannel).send({
      embeds: [embed],
    });
    const guildId = guild.id;

    configmodel
      .find({
        guildId: guildId,
      })
      .then(async (guildconfig) => {
        if (!guildconfig || guildconfig.length == 0) {
          new configmodel({
            name: guild.name,
            guildId: guildId,
            trigger: [],
            bypass: [],
            removable: [],
            logchannel: "",
            su: [],
          }).save();
        }
      });
  } catch (err) {
    if (err) console.log(err);
  }
});
client.on("guildDelete", (guild) => {
  try {
    const embed = new MessageEmbed()
      .setTitle("Left Server")
      .addField(
        "Guild Info",
        `${guild.name} (${guild.id})\n ${guild.membercount} members`
      )
      .setFooter(`Now in ${client.guilds.cache.size} guilds`)
      .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor("RED");
    client.channels.cache.get(logchannel).send({
      embeds: [embed],
    });
    const guildId = guild.id;
    configmodel.deleteOne({ guildId: `${guildId}` }).then(() => {
      const time = mp.getTimeOfDay();
      console.log(time, `left a guild`);
    });
  } catch (err) {
    console.log(err);
  }
});
