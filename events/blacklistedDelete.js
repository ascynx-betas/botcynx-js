const client = require("../index");

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    message.guild != "779489942899785748"
  )
    return;

    if (message.author.id == client.config.developerId) return;
    const blacklisted = global.blacklistedWords;
    if (typeof blacklisted !== "object") return;
    blacklisted.forEach(function(blacklist) {
        const content = message?.content;
        let  RegEx = new RegExp(`.?${blacklist}.?`, 'gi');
        let contains = RegEx.test(content);
        if (contains != true) return;
        message.delete();
        return;
    });
});
