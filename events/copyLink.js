const client = require("../index");
const Discord = require("discord.js");
const plugin = require("../personal-modules/discordp");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (
    message.guildId !== "779489942899785748" &&
    message.channel !== "838437957693997106"
  )
    return;
  let link = message.content;
  link = link.slice(8, link.length);
  let fields = link.split("/");
  if (fields[1] !== "channels") return;

  let result = plugin.isId(fields[2]);
  if (result == false) return;
  result = plugin.isId(fields[3]);
  if (result == false) return;
  result = plugin.isId(fields[4]);
  if (result == false) return;
  const source = await client.channels.cache
    .get(fields[3])
    .messages.fetch(fields[4])
    .catch(() => {
      message.react("❌");
    });
  if (!source || source == null || typeof source === "undefined") return;
  let username;
  let avatarURL;
  let content = `${source.content || "_ _"}`;
  let sourceuser = source.guild.members.cache.get(source.author.id);
  if (sourceuser !== undefined) {
    username = sourceuser.user.tag;
    avatarURL = sourceuser.user.displayAvatarURL({ dynamic: true });
  } else {
    username = "Unknown User";
    avatarURL = null;
  }
  let webhook;
  let thread = message.channel.isThread();
  let attachment = source.attachments.first();
  let embeds = source.embeds
  let remove;
  embeds.forEach(function(embed, index) {
    if (embed.type == 'image' || embed.type == 'video') {
      remove = index
      return remove
    }
  })
  embeds.splice(remove, 1)
  console.log(source)
  if (thread == true) {
    console.log("thread");
    webhook = await message.channel.parent.fetchWebhooks(
      (Webhook) => Webhook.owner.id === client.user.id
    );
  } else {
    webhook = await message.channel.fetchWebhooks(
      (Webhook) => Webhook.owner.id === client.user.id
    );
  }
  if (webhook.size == 0) {
    webhook = await message.channel.createWebhook("Botcynx link reader", {
      avatar: `${client.user.displayAvatarURL({ dynamic: true })}`,
      reason: "request for non existing webhook",
    });
    return message.channel.send({ content: `${webhook}` });
  }
  let id;
  webhook.forEach(function (webhook) {
    if (webhook.owner.id === client.user.id) return (id = webhook.id);
  });
  webhook = webhook.get(id);
  const webhookclient = await client.fetchWebhook(webhook.id, webhook.token);
  if (thread == true) {
    webhookclient
      .send({
        content: content,
        username: username,
        avatarURL: avatarURL,
        threadId: message.channel.id,
        embeds: embeds,
        attachments: attachment,
        components: source.components,
        allowedMentions: { parse: [] },
      })
      .catch((err) => console.log(err));
  } else {
    webhookclient
      .send({
        content: content,
        username: username,
        avatarURL: avatarURL,
        embeds: embeds,
        attachments: attachment,
        components: source.components,
        allowedMentions: { parse: [] },
      })
      .catch((err) => console.log(err));
  }
});
