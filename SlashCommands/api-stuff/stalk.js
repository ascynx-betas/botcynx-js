const { Command } = require("reconlx");
const hypixel = require("../../personal-modules/hypixel.js");
const mojang = require("../../personal-modules/mojang");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "stalk",
  description: "Allows to see the activity of a user on hypixel",
  options: [
    {
      name: "username",
      description: "the username of the person you want to stalk",
      required: true,
      type: "STRING",
    },
  ],

  run: async ({ interaction }) => {
    //I still need to get last login and current time to calculate time since last online. Pretty sure I can get last login in the player endpoint
    const ign = interaction.options.getString("username");
    var on = ``;
    try {
      if (ign.length < 3) {
        interaction
          .followUp({
            content: `if the username you're trying to search is less than 3 characters then L cos I'm not accepting those for buggy reasons`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
        return;
      }

      if (ign.length > 16 && ign.length != 32) {
        interaction
          .followUp({
            content: `a username cannot be longer than 16 characters.`,
          })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
        return;
      }
      if (ign.length == 32) {
        interaction
          .followUp({ content: `I asked for a username not a uuid :(` })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
      }

      const uuid = await mojang
        .getUuidbyUsername(ign)
        .catch(() => `failed to fetch uuid`);
      if (uuid == `failed to fetch uuid`) {
        const description = `Player not found`;
        const embed = new MessageEmbed()
          .setDescription(description)
          .setTitle(`error: player does not exist`)
          .setThumbnail(
            `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F04%2F02%2F10%2F44%2Fcross-mark-304374_640.png&f=1&nofb=1`
          );
        interaction
          .followUp({ embeds: [embed] })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
        return;
      }
      const data = await hypixel
        .getStatus(uuid.id)
        .catch(`failed to fetch data`);
      if (data == `failed to fetch data`) {
        const description = `${uuid.name} never logged into mc.hypixel.net`;
        const embed = new MessageEmbed()
          .setDescription(description)
          .setTitle(`error: couldn't get status information`)
          .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`);
        interaction
          .followUp({ embeds: [embed] })
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
        return;
      }
      let TimeSince;
      let biggest;
      if (data.session.online == false) {
        const PlayerData = await hypixel
          .getPlayerByUuid(uuid.id)
          .catch(`failed to fetch player data`);
        const LastLogout = PlayerData.player.lastLogout;
        const CurrentTime = Date.now();
        TimeSince = CurrentTime - LastLogout;
        biggest = "";
        TimeSince = TimeSince / 1000;
        biggest = " seconds";
        if (TimeSince > 60) {
          TimeSince = TimeSince / 60; //seconds to minutes
          biggest = " minutes";
          if (TimeSince > 60) {
            TimeSince = TimeSince / 60; //minutes to hours
            biggest = " hours";
            if (TimeSince > 24) {
              TimeSince = TimeSince / 24; //hours to days
              biggest = " days";
              if (TimeSince > 7) {
                TimeSince = TimeSince / 7; //days to weeks
                biggest = " weeks";
              }
            }
          }
        }
        TimeSince = Math.round(TimeSince * 10) / 10;
      }
      
      if (TimeSince == NaN) {TimeSince = "Error: couldn't find time since last disconnect"};
      if (data.session != null) {
        const gametype = data.session.gameType;
        const gamemode = data.session.mode;
        const map = data.session.map;

        if (data.session.online == true) {
          on = `🟢`;
        } else if (data.session.online == false) {
          on = `🔴`;
        } else {
          on = `there was an error while trying to fetch the activity`;
        }

        if (data.session.online === null || data.success == false) {
          const description = `\`\`${ign}\`\` never logged on hypixel.net`;
          const embed = new MessageEmbed()
            .setDescription(description)
            .setTitle(`error: couldn't get status information`)
            .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`);
          interaction
            .followUp({ embeds: [embed] })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
          return;
        }

        if (typeof map == "undefined") {
          if (gametype == "SKYBLOCK") {
            //if in skyblock
            const gametranslate = {
              combat_3: "The End",
              dynamic: "private island",
              combat_2: "blazing fortress",
              combat_1: "spider's den",
              hub: "the hub",
              foraging_1: "the park",
              mining_1: "the gold mines",
              mining_2: "deep caverns",
              mining_3: "dwarven mines",
              crystal_hollows: "the crystal hollows",
              dungeon_hub: "the dungeon hub",
              farming_1: "the farming islands",
              dungeon: "dungeons",
            }
            //translate skyblock island ids into island names
            let gamemodetranslated = gametranslate[gamemode];
            if (gamemodetranslated == null ||typeof gamemodetranslated == "undefined") {
            gamemodetranslated = "not currently coded in";
             console.log(gamemode)
            }
            description = `\`\`${uuid.name}\`\` is currently ${on} \n in Skyblock in ${gamemodetranslated}`;
          } else if (typeof gametype == "undefined") {
            description = `\`\`${uuid.name}\`\` appears to be offline\n last time online was ${TimeSince} ${biggest} ago`;
          } else {
            description = `\`\`${uuid.name}\`\` is currently ${on} \n is in ${gametype} in the gamemode ${gamemode}`;
          }
        } else {
          description = `\`\`${uuid.name}\`\` is currently ${on}\n in the game ${gametype} in the gamemode ${gamemode}\n in ${map}`;
        }
        const embed = new MessageEmbed()
          .setAuthor({name:`${uuid.name}`})
            .setDescription(description)
            .setFooter(`powered by hypixel api`)
            .setColor(`RANDOM`)
            .setThumbnail(`https://mc-heads.net/avatar/${ign}/100`);
          //if there is a map, probably for skywars, bedwars and games like that // not sure what gamemap is used for tho
          interaction
            .followUp({ embeds: [embed] })
            .catch(() => null);
      }
    } catch (err) {
      console.log(err);
    }
  },
});

//to add
//get from api last logout + last login
//detect if online and return the time they've been online or since when they've been offline
