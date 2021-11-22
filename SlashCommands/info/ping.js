const { Command } = require("reconlx");

module.exports = new Command({
  name: "ping",
  description: "returns websocket ping",
  type: "CHAT_INPUT",

  run: async ({ client, interaction }) => {
    interaction
      .followUp({ content: `${client.ws.ping}ms!` })
      .catch(() =>
        console.log(
          `I don't have permission to send a message in ${channel} in ${guild.name}`
        )
      );
  },
});
