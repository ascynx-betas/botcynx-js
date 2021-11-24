const client = require("../index");
const mp = require("../personal-modules/testfor");
client.on("ready", () => {
  const time = mp.getTimeOfDay();
  console.log(`[${time}] ${client.user.tag} is up and ready to go!`);
});
