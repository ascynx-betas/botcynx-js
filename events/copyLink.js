const client = require("../index");
const Discord = require("discord.js");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (message.guildId !== "779489942899785748") return;
  let link = message.content;
  link = link.slice(8, link.length);
  let fields = link.split("/");
  if (fields[1] !== "channels") return;

  //get the message source
  const source = await client.channels.cache
    .get(fields[3])
    .messages.fetch(fields[4]);
  let username;
  let avatarURL;
  //user
  let sourceuser = source.guild.members.cache.get(source.author.id);
  if (sourceuser !== undefined) {
    username = sourceuser.user.tag;
    avatarURL = sourceuser.user.displayAvatarURL({ dynamic: true });
  } else {
    username = "Unknown User";
    avatarURL = null;
  }

  //webhook
  let webhook = await message.channel.fetchWebhooks(
    (Webhook) => Webhook.name === "Botcynx"
  );
  if (webhook.length === 0) {
    //create a new webhook
    return message.channel.send({ content: `webhook does not exist` });
  }
  console.log();
  webhook = webhook.map((Webhook) => Webhook.owner.id == client.user.id);
  if (webhook[0] === false) return console.log("failed");
  console.log(webhook);
  const webhookclient = new Discord.WebhookClient(
    webhook.id,
    webhook.token
  ).catch((err) => console.log(err));
  if (message.channel.isThread === true) {
    webhookclient
      .send({
        content: source.content,
        username: username,
        avatarURL: avatarURL,
        threadId: message.channel.id,
      })
      .catch((err) => console.log(err));
  } else {
    webhookclient
      .send({
        content: source.content,
        username: username,
        avatarURL: avatarURL,
      })
      .catch((err) => console.log(err));
  }
  message.reply({ content: `this is a test` }).catch((err) => console.log(err));
});
