const client = require('../index')
const mp = require('../personal-modules/testfor')
const d = require('../personal-modules/discordp')

process.on("unhandledRejection", (error) => {
    const time = mp.getTimeOfDay();
    const err = ("[" + time + "]" + " Unhandled promise rejection " + error);
    console.log(err)
    const info = d.webhook(client.config.logwb)
    return client.fetchWebhook(info.id, info.token).then((webhook) => webhook.send({content: `${err}`,username: `${client.user.tag}`,avatarURL: client.user.displayAvatarURL({ dynamic: true }),}))
  });

  process.on("uncaughtException", (error) => {
    const time = mp.getTimeOfDay();
    const err = ("[" + time + "]" + " Unhandled Exception " + error);
    console.log(err)
    const info = d.webhook(client.config.logwb)
    return client.fetchWebhook(info.id, info.token).then((webhook) => webhook.send({content: `${err}`,username: `${client.user.tag}`,avatarURL: client.user.displayAvatarURL({ dynamic: true }),}))
  })

  process.on("rejectionHandled", (error) => {
    const time = mp.getTimeOfDay();
    const err = ("[" + time + "]" + " handled promise rejection " + error);
    console.log(err)
    const info = d.webhook(client.config.logwb)
    return client.fetchWebhook(info.id, info.token).then((webhook) => webhook.send({content: `${err}`,username: `${client.user.tag}`,avatarURL: client.user.displayAvatarURL({ dynamic: true }),}))
  })