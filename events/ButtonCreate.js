const client = require("../index");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

client.on("interactionCreate", async (interaction, message) => {
  try {
    if (interaction.isButton()) {
      //weight lily
      if (!interaction.customId.startsWith("weight")) return;
      if (interaction.message.webhookId != client.user.id) return;
      let current = Date.now();
      let creation = interaction.message.createdTimestamp;
        let time = current - creation;
        if (time >= 900000) {
          const buttonrow = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId(interaction.customId)
              .setLabel('Timed out')
              .setStyle("DANGER")
              .setDisabled(true)
          );
          return interaction.update({components: [buttonrow]})
        };

      const interactioncreator = interaction.message.interaction.user.id;
      if (interaction.user.id != interactioncreator) return;
      if (interaction.customId == "weight lily") {
        const lilyweight = require("lilyweight");
        const lily = new lilyweight(client.config.hypixelapikey);

        //extract info from embed
        var uuid = interaction.message.embeds[0].thumbnail.url;
        uuid = uuid.slice(28, uuid.length - 4);
        var profilename = interaction.message.embeds[0].author.url;
        profilename = profilename.slice(29, profilename.length);
        const fields = profilename.split("/");
        let profile = fields[1];
        if (profile === "null") {
         let profileName = interaction.message.embeds[0].title;
         profileName = profileName.split('``');
         console.log(profileName[1])
         profile = profileName[1]
        }
        const username = fields[0];
        const weight = await lily.getWeight(uuid).catch(() => console.log());
        //calculations
        const skillb = Math.round(weight.skill.base * 10) / 10;
        const skillo = Math.round(weight.skill.overflow * 10) / 10;
        let tskill = skillb + skillo;
        tskill = Math.round(tskill * 10) / 10;

        const catab = Math.round(weight.catacombs.completion.base * 10) / 10;
        const catam = Math.round(weight.catacombs.completion.master * 10) / 10;
        const catae = Math.round(weight.catacombs.experience * 10) / 10;
        const tcata = catab + catam + catae;

        let tslayer = Math.round(weight.slayer * 10) / 10;
        //output
        const embed = new MessageEmbed()
          .setDescription(
            `Total weight is **\`\`${
              Math.round(weight.total * 10) / 10
            }\`\`** Current stage is: **\`\`unknown\`\`**\n
            <:catacombs:914860327978532874> Dungeon weight is \`\`${tcata}\`\`(\`\`${catab}\`\` from F completion, \`\`${catam}\`\` from MM completion and \`\`${catae}\`\` from cata level)
            <:beheaded:914859571351269447> Slayer weight is \`\`${tslayer}\`\`
                    <:skill:914859774187814932> Skill weight is \`\`${tskill}\`\`(\`\`${skillb}\`\`/\`\`${skillo}\`\` overflow)`
          )
          .setFooter(`powered by the lilyweight npm package`)
          .setThumbnail(`https://mc-heads.net/avatar/${uuid}/100`)
          .setTitle(
            `profile: **\`\`${profile}\`\`** username: **\`\`${username}\`\`**`
          )
          .setColor(`RED`)
          .setAuthor({
            name:`${username}'s Lily Weight`,
            url:`https://sky.shiiyu.moe/stats/${username}/${profile}`
          });
        const buttonrow = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`weight senither`)
            .setLabel("Press to get senither weight (WIP)")
            .setStyle("SECONDARY")
        );
        interaction.update({ embeds: [embed], components: [buttonrow] });
        return;
      }
      //weight senither
      if (interaction.customId == "weight senither") {
        const senither = require("../personal-modules/senither");
        //extract from embed
        let uuid = interaction.message.embeds[0].thumbnail.url;
        uuid = uuid.slice(28, uuid.length - 4);
        let profilename = interaction.message.embeds[0].author.url;
        profilename = profilename.slice(29, profilename.length);
        const fields = profilename.split("/");
        const speprofile = fields[1];
        const username = fields[0];
        const profile = await senither
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
        const frf = Math.round(fullweight);

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
          .setFooter(`powered by senither api`)
          .setColor(`RED`)
          .setAuthor({
            name:`${username}'s senither Weight`,
            url:`https://sky.shiiyu.moe/stats/${username}/${nameprofile}`
          })
          .setThumbnail(`https://mc-heads.net/avatar/${uuid}/100`)
          .setTitle(
            `profile: **\`\`${nameprofile}\`\`** username: **\`\`${username}\`\`**`
          );
        //button
        const buttonrow = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`weight lily`)
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
