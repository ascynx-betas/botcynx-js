const client = require("../index");
const config = require("../config");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

client.on("interactionCreate", async (interaction, message) => {
  try {
    if (interaction.isButton()) {
      //weight lily
      if (!interaction.customId.startsWith("weight")) return;
      const interactioncreator = interaction.message.interaction.user.id;
      if (interaction.user.id != interactioncreator) return;
      if (interaction.customId == "lily weight") {
        const lilyweight = require("lilyweight");
        const lily = new lilyweight(client.config.hypixelapikey);
        //console.log(interaction.message.embeds) //this is a debug information

        //extract info from embed
        var uuid = interaction.message.embeds[0].thumbnail.url;
        uuid = uuid.slice(28, uuid.length - 4);
        var profilename = interaction.message.embeds[0].author.url;
        var profilename = profilename.slice(29, profilename.length);
        var fields = profilename.split("/");
        var profile = fields[1];
        var username = fields[0];
        const weight = await lily.getWeight(uuid).catch(() => console.log());

        //calculations
        var skillb = weight.skill.base;
        var skillo = weight.skill.overflow;
        var tskill = skillb + skillo;

        var catab = weight.catacombs.completion.base;
        var catam = weight.catacombs.completion.master;
        var catae = weight.catacombs.experience;
        var tcata = catab + catam + catae;

        //output
        const embed = new MessageEmbed()
          .setDescription(
            `Total weight is **\`\`${weight.total}\`\`**\n
                    dungeon weight is \`\`${tcata}\`\`(\`\`${catab}\`\` from F completion, \`\`${catam}\`\` from MM completion and \`\`${catae}\`\` from cata level)
                    slayer weight is \`\`${weight.slayer}\`\`
                    skill weight is \`\`${tskill}\`\`(\`\`${skillb}\`\`/\`\`${skillo}\`\` overflow)`
          )
          .setFooter(`powered by the lilyweight npm package`)
          .setThumbnail(`https://mc-heads.net/avatar/${uuid}/100`)
          .setTitle(
            `profile: **\`\`${profile}\`\`** username: **\`\`${username}\`\`**`
          )
          .setColor(`RED`)
          .setAuthor(
            `${username}'s Lily Weight`,
            ``,
            `https://sky.shiiyu.moe/stats/${username}/${profile}`
          );
        const buttonrow = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`senither weight`)
            .setLabel("Press to get senither weight (WIP)")
            .setStyle("SECONDARY")
        );
        interaction.update({ embeds: [embed], components: [buttonrow] });
        return;
      }
      //weight senither
      if (interaction.customId == "senither weight") {
        const senither = require("../personal-modules/senither");
        //extract from embed
        var uuid = interaction.message.embeds[0].thumbnail.url;
        uuid = uuid.slice(28, uuid.length - 4);
        var profilename = interaction.message.embeds[0].author.url;
        var profilename = profilename.slice(29, profilename.length);
        var fields = profilename.split("/");
        var speprofile = fields[1];
        var username = fields[0];
        var profile = await senither
          .getSpecifiedProfile(uuid, speprofile)
          .catch(() => console.log());
        const dataprofile = profile.data;
        //profile infos
        const nameprofile = dataprofile.name;
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
        const rf = Math.round(fullweight * 10) / 10;

        //embed
        const embed = new MessageEmbed()
          .setDescription(
            `Total weight is **\`\`${rf}\`\`**\n
                    dungeon weight is \`\`${rfdungeon}\`\`(\`\`${rdungeon}\`\`/\`\`${rodungeon}\`\` overflow)
                    slayer weight is \`\`${rfslayer}\`\`(\`\`${rslayer}\`\`/\`\`${roslayer}\`\` overflow)
                    skill weight is \`\`${rfskill}\`\`(\`\`${rskill}\`\`/\`\`${roskill}\`\` overflow)`
          )
          .setFooter(`powered by senither api`)
          .setColor(`RED`)
          .setAuthor(
            `${username}'s senither Weight`,
            ``,
            `https://sky.shiiyu.moe/stats/${username}/${nameprofile}`
          )
          .setThumbnail(`https://mc-heads.net/avatar/${uuid}/100`)
          .setTitle(
            `profile: **\`\`${nameprofile}\`\`** username: **\`\`${username}\`\`**`
          );
        //button
        const buttonrow = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`lily weight`)
            .setLabel("Press to get lily weight (WIP)")
            .setStyle("SECONDARY")
        );
        //output
        interaction.update({ embeds: [embed], components: [buttonrow] });
        return;
      }
    } else {
      return;
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});
