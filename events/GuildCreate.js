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
    const filepath = `guild-only/${guildId}/`;
    const filename = "config.json";
    const fullpath = filepath + filename;
    const template = `{
            "name": "${guild.name}",
            "guildId": "${guild.id}",
            "trigger": [""],
            "bypass": [""],
            "removable": [""],
            "logchannel": "",
            "su": [""]
    }`;
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
    fs.stat(`${filepath}`, function (err, stat) {
      if (err == null) {
        fs.stat(`${fullpath}`, function (err, stat) {
          if (err == null) {
            return;
          } else if (err.code === "ENOENT") {
            //file does not exists
            fs.writeFile(`${fullpath}`, `${template}`, function (err) {
              if (err) {
                console.log(err.code);
              }
            });
          }
        });
      } else if (err.code === "ENOENT") {
        // file does not exist
        fs.mkdirSync(filepath);
        fs.writeFileSync(
          `${filepath}${filename}`,
          `${template}`,
          function (err) {
            if (err) {
              console.log(err.code);
            }
          }
        );
      } else {
        console.log("Some other error: ", err.code);
      }
    });
  } catch (err) {
    console.log(err);
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
    const filepath = `guild-only/${guildId}/`;
    const filename = "config.json";
    const fullpath = filepath + filename;
    configmodel.deleteOne({ guildId: `${guildId}` }).then(() => {
      const time = mp.getTimeOfDay();
      console.log(time, `left a guild`);
    });

    fs.stat(`${fullpath}`, function (err, stat) {
      if (err == null) {
        console.log("File exists");
        fs.rm(`${fullpath}`, function (err) {
          if (err) {
            return console.log(err.code);
          }
        });
      } else if (err.code === "ENOENT") {
        // file does not exist
        return console.log(`file does not exists`);
      } else {
        console.log("Some other error: ", err.code);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
