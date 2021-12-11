const { Command } = require("reconlx");
const ticketmodel = require("../../models/ticket");
const { MessageEmbed } = require("discord.js");
const bitfieldcalc = require("../../personal-modules/bitfieldcalc");
const discordmodule = require(`../../personal-modules/discordp`);

module.exports = new Command({
  name: "ticket",
  description: "allows to modify ticket config / execute ticket commands",
  userPermissions: ["MANAGE_THREADS"],
  options: [
    {
      name: "sub-command",
      description: "the sub-command to execute",
      required: "true",
      type: "STRING",
      choices: [
        {
          name: "del",
          value: "del",
        },
        {
          name: "add",
          value: "add",
        },
        {
          name: "close",
          value: "close",
        },
        {
          name: "block",
          value: "block",
        },
        {
          name: "modify",
          value: "modify",
        },
      ],
    },
    {
      name: "config-name",
      description:
        "the name of the config, only needed for the del sub-command",
      required: false,
      type: "STRING",
    },
    {
      name: "user",
      description: "target of the action",
      required: false,
      type: "USER",
    },
    {
      name: "edit",
      description: "what will be modified",
      required: false,
      type: "STRING",
      choices: [
        {
          name: "description",
          value: "description",
        },
        {
          name: "welcome message",
          value: "welcome_message",
        },
      ],
    },
    {
      name: "change",
      description: "to what it's changed",
      required: false,
      type: "STRING",
    },
  ],

  run: async ({ interaction, client }) => {
    try {
      const action = interaction.options.getString("sub-command");
      const config = interaction.options.getString("config-name");
      const target = interaction.options.getUser("user");
      const change = interaction.options.getString("change");
      const edit = interaction.options.getString("edit");
      const guildId = interaction.guild.id;
      const channel = interaction.channel;
      if (action != "del") {
        if (interaction.channel.isThread() === false && action != "modify") {
          return interaction
            .followUp({
              content: `the channel in which you executed this command is not a thread`,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
        } else {
          //code
          if (action == "close") {
            const thread = interaction.channel;
            interaction
              .followUp({ content: `Locking thread...`, ephemeral: true })
              .then(thread.setLocked())
              .then(thread.setArchived())
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          } else if (action == "add") {
            const thread = interaction.channel;
            if (typeof target == "undefined") {
              interaction
                .followUp({
                  content: ` please enter a valid user when executing this command`,
                })
                .catch(() =>
                  console.log(
                    `I don't have permission to send a message in ${channel} in ${guild.name}`
                  )
                );
            } else {
              thread.members
                .add(`${target.id}`)
                .then(() =>
                  interaction.followUp({
                    content: `successfully added ${target.tag} to the thread`,
                  })
                )
                .catch(() =>
                  console.log(
                    `I don't have permission to send a message in ${channel} in ${guild.name}`
                  )
                );
            }
          } else if (action == "block") {
            //add as perm the person to block so they can't send messages in threads ? // that would be for all threads in that channel though
            //if no user given then gives blocked user list
            //if user is not blocked add the permissions "can't send messages in thread to user"
            //if user is blocked remove perm override
            if (!target || typeof target === "undefined") {
              //if no target specified
              const channelparent = client.channels.cache.get(channel.parentId);
              const permissions = channelparent.permissionOverwrites.cache.map(
                (role) => role
              );
              await discordmodule.permOverride(permissions).then((permlist) => {
                let denied = permlist.denied;
                let result = [];
                let permbed = [];
                denied.forEach(function (denied) {
                  denied = Number(denied);
                  const dp = bitfieldcalc.permissions(denied);
                  if (dp.includes("SEND_MESSAGES_IN_THREADS")) {
                    return result.push(true);
                  } else {
                    return result.push(false);
                  }
                });
                let index = 0;
                do {
                  if (result[index] === true) {
                    permbed.push(permlist.permlist[index]);
                    index += 1;
                  } else {
                    index += 1;
                  }
                } while (index !== permlist.permlist.length);
                const embeddesc = permbed.join("\n");
                const embed = new MessageEmbed()
                  .setDescription(embeddesc)
                  .setTitle(`people that are blocked`);
                interaction.followUp({ embeds: [embed] });
              });
            } else {
              //if specified
              const channelparent = client.channels.cache.get(channel.parentId);
              const permissions = channelparent.permissionOverwrites.cache.map(
                (role) => role
              );
              await discordmodule
                .permOverride(permissions)
                .then((permissions) => {
                  if (permissions.permlist.includes(`<@${target.id}>`)) {
                    channelparent.permissionOverwrites.delete(
                      target.id,
                      `used command /ticket block (user)`
                    );
                    return interaction.editReply({
                      content: `${target.tag} is now unblocked`,
                    });
                  } else {
                    channelparent.permissionOverwrites.create(target.id, {
                      SEND_MESSAGES_IN_THREADS: false,
                    });
                    return interaction.editReply(
                      `**${target.tag} is now blocked**\nblocking someone means they cannot talk in any threads created in this channel`
                    );
                  }
                });
            }
          } else if (action == "modify") {
            if (
              typeof config === "undefined" ||
              !config ||
              typeof edit === "undefined" ||
              !edit ||
              typeof change === "undefined" ||
              !change
            )
              return interaction.followUp({
                content: `please specify config name`,
              });
            const tc = await ticketmodel.find({
              guildId: guildId,
              name: config,
            });
            if (tc.length === 0)
              return interaction.followUp({
                content: `specified ticket id does not exist, please try again`,
              });
            if (edit === "description") {
              //get the message using guild/channel/message then edit the embed using the change
              const embed = new MessageEmbed()
                .setColor(`#69696E`)
                .setDescription(
                  `${
                    change ||
                    "press create to enter in contact with staff members"
                  }`
                );
              await client.channels.cache
                .get(tc[0].channel)
                .messages.fetch(tc[0].linkedmessage)
                .then((message) =>
                  message.edit({ embeds: [embed] }).then(() => {
                    return interaction.followUp({ content: `(edited)` });
                  })
                );
            } else if (edit === "welcome_message") {
              ticketmodel.updateOne(
                { guildId: `${guildId}`, name: `${config}` },
                { $set: { welcomemessage: `${change || undefined}` } },
                function (err, doc) {
                  if (err)
                    return interaction.followUp({
                      content: `there was an error while trying to update values \`\`${err}\`\``,
                    });
                }
              );
              return interaction.followUp({
                content: `sucessfully changed the welcome message`,
              });
            }
          } else {
            interaction
              .followUp({ content: `this command is not currently coded in` })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          }
        }
      } else {
        //code of del
        let userId = interaction.user.id;
        let guild = interaction.guild;
        let guildmember = guild.members.fetch(userId);
        let userp = Number((await guildmember).permissions);
        userp = bitfieldcalc.permissions(userp);
        if (
          !userp.includes("ADMINISTRATOR") &&
          userId !== guild.ownerId &&
          userId !== client.config.developerId
        )
          return interaction.followUp({
            content: `you do not have \`\`ADMINISTRATOR\`\` permission`,
          });
        if (!config)
          return interaction.followUp({ content: `please specify config` });
        if (
          config == "config" ||
          config.includes(`info`) ||
          config == "close"
        ) {
          return interaction.followUp({
            content: `you can't delete ${config}`,
          });
        }
        const existing = await ticketmodel.find({
          name: config,
          guildId: guildId,
        });
        if (existing.length !== 0) {
          ticketmodel.deleteOne({ name: `${config}` }).then(() => 
            client.channels.cache
                .get(existing[0].channel)
                .messages.fetch(existing[0].linkedmessage)
                .then((message) => message.delete()
                .then(() => interaction.followUp({content: `sucessfully deleted message`})))
            
          );
        } else {
          return interaction.followUp({ content: `ticket does not exist` });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
});
