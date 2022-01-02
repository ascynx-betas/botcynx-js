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
    const ign = interaction.options.getString("username");
    var on = ``;
      if (ign.length < 3) {
        interaction
          .followUp({
            content: `if the username you're trying to search is less than 3 characters then L cos I'm not accepting those for buggy reasons`,
          })
          .catch(() => null);
        return;
      }

      if (ign.length > 16 && ign.length != 32) {
        interaction
          .followUp({
            content: `a username cannot be longer than 16 characters.`,
          })
          .catch(() => null);
        return;
      }
      if (ign.length == 32) {
        interaction
          .followUp({ content: `I asked for a username not a uuid :(` })
          .catch(() => null);
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
          .catch(() => null);
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
          .catch(() => null);
        return;
      }
      let TimeSince;
      let time;
      if (data.session.online == false) {
        const PlayerData = await hypixel
          .getPlayerByUuid(uuid.id)
          .catch(`failed to fetch player data`);
        const LastLogout = PlayerData.player.lastLogout;
        const CurrentTime = Date.now();
        TimeSince = CurrentTime - LastLogout;
        time = "";
        TimeSince = TimeSince / 1000;
        time = " seconds";
        if (TimeSince > 60) {
          TimeSince = TimeSince / 60; //seconds to minutes
          time = " minutes";
          if (TimeSince > 60) {
            TimeSince = TimeSince / 60; //minutes to hours
            time = " hours";
            if (TimeSince > 24) {
              TimeSince = TimeSince / 24; //hours to days
              time = " days";
              if (TimeSince > 7) {
                TimeSince = TimeSince / 7; //days to weeks
                time = " weeks";
              }
            }
          }
        }
        TimeSince = Math.round(TimeSince * 10) / 10;
      }
      
      if (TimeSince == NaN) {TimeSince = "Error: couldn't find time since last disconnect"};
      if (data.session != null) {
        const gameType = data.session.gameType;
        const gameMode = data.session.mode;
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
            .catch(() => null);
          return;
        }

        if (typeof map == "undefined") {
          if (gameType == "SKYBLOCK") {
            //if in skyblock
            const gameModetranslate = {
              combat_3: "The End",
              dynamic: "Private island",
              combat_2: "Blazing fortress",
              combat_1: "Spider's den",
              hub: "The hub",
              foraging_1: "The park",
              mining_1: "The gold mines",
              mining_2: "Deep caverns",
              mining_3: "Dwarven mines",
              crystal_hollows: "The crystal hollows",
              dungeon_hub: "The dungeon hub",
              farming_1: "The farming islands",
              dungeon: "Dungeons",
            }
            //translate skyblock island ids into island names
            let gameModeTranslated = gameModetranslate[gameMode];
            if (gameModeTranslated == null || typeof gameModeTranslated == "undefined") {
            gameModeTranslated = "not currently coded in";
             console.log(gameMode)
            }
            description = `\`\`${uuid.name}\`\` is currently ${on} \n in Skyblock in ${gameModeTranslated}`;
          } else if (typeof gameType == "undefined") {
            description = `\`\`${uuid.name}\`\` appears to be offline\n last time online was ${TimeSince} ${time} ago`;
          } else {
            description = `\`\`${uuid.name}\`\` is currently ${on} \n is in ${gameType} in the gameMode ${gameMode}`;
          }
        } else {
          description = `\`\`${uuid.name}\`\` is currently ${on}\n in the game ${gameType} in the gameMode ${gameMode}\n in ${map}`;
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
  },
});
