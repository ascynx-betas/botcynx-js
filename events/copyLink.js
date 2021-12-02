const client = require("../index");
const plugin = require("../personal-modules/discordp");
const config = require("../models/config");
const calc = require("../personal-modules/bitfieldcalc");
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  const guildconfig = await config.find({
    guildId: message.guild.id,
  });
  let permissions = calc.permissions(Number(message.guild.me.permissions));
  if (!permissions.includes("MANAGE_WEBHOOKS")) return;
  let b = guildconfig[0].blocked;
  if (b.includes("NoRead")) return;
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
  const sourceconfig = await config.find({
    guildId: fields[2],
  });
  let blocked = sourceconfig[0].blocked;
  if (blocked.includes(fields[3])) return console.log(`blocked channel`);
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
  let attachmenturl;
  if (typeof attachment !== "undefined") {
    attachmenturl = attachment.url;
  }
  let embeds = source.embeds;
  embeds.forEach(function (embed, index) {
    if (embed.type == "image" || embed.type == "video") {
      embeds.splice(index, 1);
    }
  });
  if (thread == true) {
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
    if (typeof attachment !== "undefined") {
      webhookclient
        .send({
          content: content,
          username: username,
          avatarURL: avatarURL,
          threadId: message.channel.id,
          embeds: embeds,
          components: source.components,
          allowedMentions: { parse: [] },
          files: [attachmenturl],
        })
        .catch((err) => console.log(err));
    } else {
      webhookclient
        .send({
          content: content,
          username: username,
          avatarURL: avatarURL,
          threadId: message.channel.id,
          embeds: embeds,
          components: source.components,
          allowedMentions: { parse: [] },
        })
        .catch((err) => console.log(err));
    }
  } else {
    if (typeof attachment !== "undefined") {
      webhookclient
        .send({
          content: content,
          username: username,
          avatarURL: avatarURL,
          embeds: embeds,
          components: source.components,
          allowedMentions: { parse: [] },
          files: [attachmenturl],
        })
        .catch((err) => console.log(err));
    } else {
      webhookclient
        .send({
          content: content,
          username: username,
          avatarURL: avatarURL,
          embeds: embeds,
          components: source.components,
          allowedMentions: { parse: [] },
        })
        .catch((err) => console.log(err));
    }
  }
});

//currently breaks if providing a file attachment as I'm too stupid to figure out how to deal with that
