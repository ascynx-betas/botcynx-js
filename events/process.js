const client = require("../index");
const mp = require("../personal-modules/testfor");
const d = require("../personal-modules/discordp");
const process = require("process");

process.on("unhandledRejection", async (reason, promise) => {
  console.log(promise);
  const time = mp.getTimeOfDay();
  const err =
    "[" +
    time +
    "]" +
    " Unhandled promise rejection " +
    reason +
    " at " +
    JSON.stringify(promise);
  console.log(err);
  const info = d.webhook(client.config.logwb);
  return client
    .fetchWebhook(info.id, info.token)
    .then((webhook) =>
      webhook.send({
        content: `${err}`,
        username: `${client.user.tag}`,
        avatarURL: client.user.displayAvatarURL({ dynamic: true }),
      })
    );
});

process.on("uncaughtException", async (reason, promise) => {
  const time = mp.getTimeOfDay();
  const err =
    "[" +
    time +
    "]" +
    " Unhandled Exception " +
    reason +
    " at " +
    JSON.stringify(promise);
  console.log(err);
  const info = d.webhook(client.config.logwb);
  return client
    .fetchWebhook(info.id, info.token)
    .then((webhook) =>
      webhook.send({
        content: `${err}`,
        username: `${client.user.tag}`,
        avatarURL: client.user.displayAvatarURL({ dynamic: true }),
      })
    );
});

process.on("rejectionHandled", async (reason, promise) => {
  const time = mp.getTimeOfDay();
  const err =
    "[" +
    time +
    "]" +
    " handled promise rejection " +
    reason +
    " at " +
    JSON.stringify(promise);
  console.log(err);
  const info = d.webhook(client.config.logwb);
  return client
    .fetchWebhook(info.id, info.token)
    .then((webhook) =>
      webhook.send({
        content: `${err}`,
        username: `${client.user.tag}`,
        avatarURL: client.user.displayAvatarURL({ dynamic: true }),
      })
    );
});
