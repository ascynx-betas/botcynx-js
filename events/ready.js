const client = require("../index");
const mp = require("../personal-modules/testfor");
const mongoose = require("mongoose");
client.on("ready", () => {
  const time = mp.getTimeOfDay();
  console.log(`[${time}] ${client.user.tag} is up and ready to go!`);

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(
    "next command(avoid doing more than once cos it will go into the terminal): ",
    (output) => {
      if (output === "shutdown") {
        mongoose.disconnect();
        console.log("mongoose connection is now severed");
        client.destroy();
        const time = mp.getTimeOfDay();
        console.log(`[${time}] client is now offline`);
      }
      readline.close();
    }
  );
});
