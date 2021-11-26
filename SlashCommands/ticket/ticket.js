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
  ],

  run: async ({ interaction, message, client }) => {
    try {
      const action = interaction.options.getString("sub-command");
      const config = interaction.options.getString("config-name");
      const target = interaction.options.getUser("user");
      const guildId = interaction.guild.id;
      const channel = interaction.channel;
      if (action != "del") {
        if (!interaction.channel.isThread) {
          interaction
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
            return interaction.followUp({
              content: `this command is not currently finished`,
            });
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
                console.log(permlist);
                let denied = permlist.denied;
                denied.forEach(function (denied) {
                  denied = Number(denied);
                  const dp = bitfieldcalc.permissions(denied);
                  if (dp.includes("SEND_MESSAGES_IN_THREADS"))
                    return (denied = true);
                  console.log(dp);
                });
                const embeddesc = permlist.permlist.join("\n");
                const embed = new MessageEmbed()
                  .setDescription(embeddesc)
                  .setTitle(`permissions`);
                interaction.followUp({ embeds: [embed] });
              });
            } else {
              //if specified
              channel.parentId.permissionOverwrites.create(target.id, {
                SEND_MESSAGES_IN_THREADS: false,
              });
              interaction.reply(`${target.user.tag} was added to block`);
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
          ticketmodel
            .deleteOne({ name: `${config}` })
            .then(() =>
              interaction
                .followUp({
                  content: `you can now delete the ticket message 👍`,
                })
                .catch(() =>
                  console.log(
                    `I don't have permission to send a message in ${channel} in ${guild.name}`
                  )
                )
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
