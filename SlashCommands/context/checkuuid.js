const hypixel = require("../../personal-modules/hypixel");
const verifyModel = require("../../models/verifymodel");

module.exports = {
  name: "getinfo",
  type: "USER",
  invisible: true,

  run: async (client, interaction, args) => {
      const user = await client.users.fetch(interaction.targetId);
      const userId = user.id;
      let specificity;

      const userInfo = await verifyModel.find({
        userId: userId,
      });
      const info = userInfo[0];

      if (!userInfo?.length)
        return interaction
          .followUp({
            content: `the user isn't verified, tell them to use /verify`,
            ephemeral: true,
          })
          .catch(() => null);
      const uuid = info.minecraftuuid;
      if (typeof uuid !== "undefined") {
        const data = await hypixel.getPlayerByUuid(uuid).catch(console.log);
        const username = data.player.displayname;
        if (info.labels.length > 0) {
          const labellist = info.labels;
          if (labellist.includes("pog person")) {
            specificity = "<a:hypersquish:910587055313133608>";
          } else if (labellist.includes("owner")) {
            specificity = "<a:macroing:903652184766427187>";
          } else if (labellist.includes("scammer")) {
            specificity = "<a:LdanceFast:911214913270210580>";
          }
          return interaction
            .followUp({
              content: `${specificity || ""} ${
                user.tag
              }\'s username is \`\`${username}\`\` and has the label(s) ${labellist.toString()}`,
              ephemeral: true,
            })
            .catch(() => null);
        } else {
          return interaction
            .followUp({
              content: `${user.tag}\'s username is \`\`${username}\`\``,
              ephemeral: true,
            })
            .catch(() => null);
        }
      } else {
        return interaction.followUp({ content: ` couldn't fetch uuid` });
      }
  },
};

/**
 * when dealing with mongodb databases using mongoose, if you want to get informations that you wrote outside of addition, you need to have them in the model
 */
