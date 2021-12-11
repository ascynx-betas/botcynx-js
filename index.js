const { Client, Collection } = require("discord.js");
const mp = require("./personal-modules/testfor");

const client = new Client({
  disableMention: "everyone",
  intents: 32767,
});
console.log(process.env)
module.exports = client;
// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);

process.on("unhandledRejection", (error) => {
  const time = mp.getTimeOfDay();
  console.error("[" + time + "]" + " Unhandled promise rejection" + error);
});
