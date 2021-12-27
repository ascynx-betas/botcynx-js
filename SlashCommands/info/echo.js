const { Command } = require("reconlx");

module.exports = new Command({
  name: "echo",
  description: "allows the person to send a message via the bot",
  userPermissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "message",
      description: "the message you want to send",
      type: "STRING",
      required: true,
    },
    {
      name: "channel",
      description: "in what channel you want to send it",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: false,
    },
    {
      name: "target",
      description: "to who you want to send it",
      type: "USER",
      required: false,
    },
  ],

  run: async ({ client, interaction }) => {
    const message = interaction.options.getString("message");
    const user = interaction.options.getUser("target");
    const channel = interaction.options.getChannel("channel");
      if (user) {
        user
          .send({ content: message })
          .catch(() => interaction.followUp("Can't send DM to specified user"));
        interaction
          .followUp({ content: `sent message '${message}' to ${user.tag}` })
          .catch(() => null);
      } else if (channel) {
          channel
            .send({ content: message, allowedMentions: { parse: [] } })
            .catch(() =>
              interaction.editReply(
                "I don't have permission to send a message in the specified channel"
              )
            );
          interaction
            .followUp({ content: `sent message in ${channel}` })
            .catch(() => null);
      } else {
        interaction.followUp({ content: message });
      }
  },
});
