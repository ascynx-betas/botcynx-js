const client = require("../index");
const mp = require("../personal-modules/testfor");
const d = require("../personal-modules/discordp");
const process = require("process");

process.on("unhandledRejection", async (error) => {
  let stack = error.stack;
  let fields = stack.split('\n');
  stack = fields[0]+"\n"+fields[1];
  const time = mp.getTimeOfDay();
  const err =
    "[" +
    time +
    "]" +
    " Unhandled promise rejection: " +
    stack;

    console.log("[",time,"]: ", error.stack);

  const info = d.webhook(client.config.logwb);
  if (!info) return console.log('webhook not found');
  
  return client.fetchWebhook(info.id, info.token).then((webhook) =>
    webhook.send({
      content: `${err}`,
      username: `${client.user.tag}`,
      avatarURL: client.user.displayAvatarURL({ dynamic: true }),
    })
  );
});

process.on("uncaughtException", async (error) => {
  let stack = error.stack;
  let fields = stack.split('\n');
  stack = fields[0]+"\n"+fields[1];

  const time = mp.getTimeOfDay();
  const err =
    "[" +
    time +
    "]" +
    " Unhandled Exception " +
    stack;
    console.log("[",time,"]: ", error.stack);
  const info = d.webhook(client.config.logwb);
  if (!info) return console.log('webhook not found');
  return client.fetchWebhook(info.id, info.token).then((webhook) =>
    webhook.send({
      content: `${err}`,
      username: `${client.user.tag}`,
      avatarURL: client.user.displayAvatarURL({ dynamic: true }),
    })
  );
});

process.on("rejectionHandled", async (error) => {
  let stack = error.stack;
  let fields = stack.split('\n');
  stack = fields[0]+"\n"+fields[1];
  const time = mp.getTimeOfDay();
  const err =
    "[" +
    time +
    "]" +
    " handled promise rejection " +
    stack;

    console.log("[",time,"]: ", error.stack);

  const info = d.webhook(client.config.logwb);
  if (!info) return console.log('webhook not found');

  return client.fetchWebhook(info.id, info.token).then((webhook) =>
    webhook.send({
      content: `${err}`,
      username: `${client.user.tag}`,
      avatarURL: client.user.displayAvatarURL({ dynamic: true }),
    })
  );
});
