const hypixel = require("../../personal-modules/hypixel");
const verifyModel = require("../../models/verifymodel");
const { Command } = require("reconlx");

module.exports = new Command({
  name: "dbcheck",
  description: "get the minecraft username of the person from the database",
  options: [
    {
      name: "target",
      description: "the discord of the person",
      type: "USER",
      required: true,
    },
  ],

  run: async ({ interaction }) => {
    try {
      const user = interaction.options.getUser("target");
      const userId = user.id;
      var specificity;

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
          .catch(() =>
            console.log(
              `I don't have permission to send a message in ${channel} in ${guild.name}`
            )
          );
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
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
        } else {
          return interaction
            .followUp({
              content: `${user.tag}\'s username is \`\`${username}\`\``,
              ephemeral: true,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
        }
      } else {
        return interaction.followUp({ content: ` couldn't fetch uuid` });
      }
    } catch (err) {
      console.log(err);
    }
  },
});

/**
 * when dealing with mongodb databases using mongoose, if you want to get informations that you wrote outside of addition, you need to have them in the model
 */
