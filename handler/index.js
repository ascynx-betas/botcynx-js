const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const globalvars = require('../globalvars');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description; //if context menu
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    //set Global parameters
    global.maxTimeOut = "28 days";
    global.readableperms = globalvars.readableperms;
    client.user.setPresence({
      activities: [{ name: "test", type: "WATCHING" }],
    }); //PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS
    client.user.setStatus("online");

    // Register for a single guild
    const guild = client.guilds.cache.get("779489942899785748");
    await guild.commands.set(arrayOfSlashCommands);

    // Register for all the guilds the bot is in
    client.application.commands.set(arrayOfSlashCommands);
  });

  // mongoose
  const { mongooseConnectionString } = require("../config.json");
  if (!mongooseConnectionString) return;
  //to close all connections (you have currently to remove / re-add IP address to reset connection)
  //to close connections you can also now use the kill command or shutdown in console

  mongoose
    .connect(mongooseConnectionString)
    .then(() => console.log("Connected to mongodb"));
};
