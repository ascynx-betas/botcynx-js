const { Command } = require("reconlx");

module.exports = new Command({
  name: "ping",
  description: "returns websocket ping",
  type: "CHAT_INPUT",

  run: async ({ client, interaction }) => {
    interaction
      .followUp({ content: `${client.ws.ping}ms!` })
      .catch(() => null);
  },
});
