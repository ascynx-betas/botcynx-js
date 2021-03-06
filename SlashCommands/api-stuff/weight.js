const { Command } = require("reconlx");
const senither = require("../../personal-modules/senither");
const hypixel = require("../../personal-modules/hypixel");
const ma = require("../../personal-modules/mojang");
const verify = require("../../models/verifymodel");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "weight",
  description: "check a user's weight using this command",
  options: [
    {
      name: "username",
      description: "the user you want the see the profiles of",
      required: false,
      type: "STRING",
    },
    {
      name: "profile",
      description: "the profile you want to see the weight of",
      required: false,
      type: "STRING",
    },
  ],

  run: async ({ interaction }) => {
    var ign = interaction.options.getString("username");
    let speprofile = interaction.options.getString("profile");
    var profile;
    //todo, detect if profile is ironman and putting a small something for if it's ironman
    //game stage according to weight value
    /**
     * probably add intermedietary stages in late / end game
     */
      if (!ign) {
        const userId = interaction.user.id;

        const userInfo = await verify.find({
          userId: userId,
        });
        const info = userInfo[0];

        if (!userInfo?.length)
          return interaction
            .followUp({
              content: `please provide username or use the /verify command first`,
              ephemeral: true,
            })
            .catch(() => null);
        var uuid = info.minecraftuuid;
      } else {
        if (ign.length < 3) {
          interaction.followUp({
            content: `if the username you're trying to search is less than 3 characters then L cos I'm not accepting those for buggy reasons`,
          });
          return;
        }

        if (ign.length > 16 && ign.length != 32) {
          interaction.followUp({
            content: `a username cannot be longer than 16 characters.`,
          });
          return;
        }
        if (ign.length == 32) {
          interaction.followUp({
            content: `I asked for a username not a uuid :(`,
          });
          return;
        }
      }

      if (typeof uuid === "undefined") {
        var uuid = await ma.getUuidbyUsername(ign).catch(() => null);
        uuid = uuid.id;
      } else {
        const data = await hypixel
          .getPlayerByUuid(uuid)
          .catch(() => null);
        if (!data) {
          return interaction.followUp({
            content: `error while trying to fetch player name`,
          });
        }
        ign = data.player.displayname;
      }

      //const profiles = await senither.getProfiles(uuid).catch(() => console.log())
      //if (typeof profiles === 'undefined') {
      //return interaction.followUp({content: `player not found`});
      //}
      if (speprofile) {
        const lowercase = speprofile.toLowerCase();
        speprofile = lowercase;
        if (
          speprofile != "apple" &&
          speprofile != "banana" &&
          speprofile != "blueberry" &&
          speprofile != "coconut" &&
          speprofile != "cucumber" &&
          speprofile != "grapes" &&
          speprofile != "kiwi" &&
          speprofile != "lemon" &&
          speprofile != "lime" &&
          speprofile != "mango" &&
          speprofile != "orange" &&
          speprofile != "papaya" &&
          speprofile != "pear" &&
          speprofile != "pineapple" &&
          speprofile != "pomegranate" &&
          speprofile != "raspberry" &&
          speprofile != "strawberry" &&
          speprofile != "tomato" &&
          speprofile != "watermelon" &&
          speprofile != "zucchini" &&
          speprofile != "peach"
        ) {
          const embed = new MessageEmbed()
            .setDescription(
              `${speprofile} doesn't seem to match the possible profile names\nif you feel like that's an error please contact the developer.`
            )
            .setFooter("Error 502: Blocked Request");
          return interaction.followUp({
            embeds: [embed],
          });
        }
        var profile = await senither
          .getSpecifiedProfile(uuid, speprofile)
          .catch(() => console.log());
        if (typeof profile === "undefined" || !profile) {
          const embed = new MessageEmbed()
            .setDescription(
              `player not found or profile provided does not exist`
            )
            .setFooter("Error 404: Not found");
          return interaction.followUp({
            embeds: [embed],
          });
        }
      } else {
        var profile = await senither
          .getFatterProfile(uuid)
          .catch(() => console.log());
        if (typeof profile === "undefined" || !profile) {
          const embed = new MessageEmbed()
            .setDescription(`player not found or profile does not exist`)
            .setFooter("Error 404: Not found");
          return interaction.followUp({
            embeds: [embed],
          });
        }
      }

      const dataprofile = profile.data;
      //profile infos
      if (
        !dataprofile ||
        !dataprofile.dungeons ||
        !dataprofile.slayers.weight ||
        dataprofile.skills.apiEnabled == false
      ) {
        const embed = new MessageEmbed()
          .setDescription(
            "couldn't fetch weight, please check if you have your api on"
          )
          .setFooter("Error 404: Not Found");
        return interaction.followUp({
          content: `https://sky.shiiyu.moe/resources/video/enable-api.webm`,
          embeds: [embed],
        });
      }
      const profilename = dataprofile.name;
      const skillweight = dataprofile.skills.weight;
      const skilloweight = dataprofile.skills.weight_overflow;
      const slayerweight = dataprofile.slayers.weight;
      const slayeroweight = dataprofile.slayers.weight_overflow;
      const dungeonweight = dataprofile.dungeons.weight;
      const dungeonoweight = dataprofile.dungeons.weight_overflow;

      //calculations
      const fdungeonweight = dungeonweight + dungeonoweight;
      const fullskillweight = skillweight + skilloweight;
      const fullslayerweight = slayerweight + slayeroweight;
      const fullweight = fdungeonweight + fullskillweight + fullslayerweight;

      //rounded calculations
      const rskill = Math.round(skillweight * 10) / 10;
      const roskill = Math.round(skilloweight * 10) / 10;
      const rslayer = Math.round(slayerweight * 10) / 10;
      const roslayer = Math.round(slayeroweight * 10) / 10;
      const rdungeon = Math.round(dungeonweight * 10) / 10;
      const rodungeon = Math.round(dungeonoweight * 10) / 10;
      const rfskill = Math.round(fullskillweight * 10) / 10;
      const rfslayer = Math.round(fullslayerweight * 10) / 10;
      const rfdungeon = Math.round(fdungeonweight * 10) / 10;
      const frf = Math.round(fullweight);
      const rf = Math.round(fullweight * 10) / 10;
      let gamestage;
      if (frf <= 2000) {
        gamestage = "early game";
      } else if (frf >= 2000 && frf <= 7000) {
        gamestage = "mid game";
      } else if (frf >= 7000 && frf <= 13000) {
        gamestage = "late game";
      } else if (frf >= 15000) {
        gamestage = "end game";
      } else {
        gamestage = null;
      }

      //embed
      const embed = new MessageEmbed()
        .setDescription(
          `Total weight is **\`\`${rf}\`\`** Current stage is: **\`\`${gamestage}\`\`**\n
          <:catacombs:914860327978532874> Dungeon weight is \`\`${rfdungeon}\`\`(\`\`${rdungeon}\`\`/\`\`${rodungeon}\`\` overflow)
          <:beheaded:914859571351269447> Slayer weight is \`\`${rfslayer}\`\`(\`\`${rslayer}\`\`/\`\`${roslayer}\`\` overflow)
        <:skill:914859774187814932> Skill weight is \`\`${rfskill}\`\`(\`\`${rskill}\`\`/\`\`${roskill}\`\` overflow)`
        )
        .setFooter(`requested by ${interaction.user.tag}`)
        .setColor(`RED`)
        .setAuthor({
          name:`${ign}'s senither Weight`,
          url:`https://sky.shiiyu.moe/stats/${ign}/${speprofile}`
        })
        .setThumbnail(`https://mc-heads.net/avatar/${uuid}/100`)
        .setTitle(
          `profile: **\`\`${profilename}\`\`** username: **\`\`${ign}\`\`**`
        );
      //button
      const buttonrow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`weight lily`)
          .setLabel("Press to get lily weight (WIP)")
          .setStyle("SECONDARY")
      );
      //output
      interaction
        .followUp({ embeds: [embed], components: [buttonrow] })
        .catch(() => null);
  },
});
