const { Command } = require("reconlx");
const verifyModel = require("../../models/verifymodel");
const hypixel = require("../../personal-modules/hypixel.js");
const slothpixel = require("../../personal-modules/slothpixel.js");
const configmodel = require("../../models/config");

module.exports = new Command({
  name: "verify",
  description: "verifies or update the user's info into the database",
  options: [
    {
      name: "username",
      description: "the minecraft username",
      type: "STRING",
      required: true,
    },
    {
      name: "action",
      description: "the action that will be executed by the bot",
      type: "STRING",
      required: false,
      choices: [
        {
          name: "verify",
          value: "verify",
        },
        {
          name: "update",
          value: "update",
        },
      ],
    },
  ],

  run: async ({ interaction }) => {
    try {
      const ign = interaction.options.getString("username");
      const user = interaction.user;
      const usertag = interaction.user.tag;
      const userId = interaction.user.id;
      const guildId = interaction.guild.id;
      const configt = await configmodel.find({
        guildId: guildId,
      });
      const config = configt[0];
      const member = interaction.guild.members.cache.get(userId);
      const action = interaction.options.getString("action");

      if (ign.length < 3) {
        interaction.followUp({
          content: `if the username you're trying to search is less than 3 characters then L cos I'm not accepting those for buggy reasons`,
        });
        return;
      }

      if (ign.length > 16 && ign.length != 32 && ign.length != 36) {
        interaction.followUp({
          content: `a username cannot be longer than 16 characters.`,
        });
        return;
      }
      if (ign.length == 32 || ign.length == 36) {
        interaction.followUp({
          content: `I asked for a username not a uuid :(`,
        });
        return;
      }

      const linkedtag = await slothpixel
        .getDiscord(ign)
        .catch(
          () => `there was an error while trying to fetch the discord tag`
        );
      const minecraftuuid = await slothpixel
        .getuuid(ign)
        .catch(() => `failed to fetch uuid`);

      const uuidInfo = await verifyModel.find({
        minecraftuuid: minecraftuuid,
      });
      const userInfo = await verifyModel.find({
        userId: userId,
      });

      if (action != "update") {
        //verify code
        if (uuidInfo.length > 0) {
          return interaction
            .followUp({
              content: `that account is already linked, if you want to change the linked account, use the update command`,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
        }

        if (userInfo.length > 0) {
          const verifyrole = config.verify;
          if (typeof verifyrole !== "undefined") {
            if (!member.roles.cache.has(verifyrole)) {
              member.roles
                .add(verifyrole)
                .catch(() =>
                  console.log(
                    `I don't have permission to add ${verifyrole} in ${guildId}`
                  )
                );
            }
          }
          return interaction
            .followUp({
              content: `that account is already linked, if you want to change the linked account, use the update subcommand`,
              ephemeral: true,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
        }
        if (usertag == linkedtag) {
          new verifyModel({
            userId: user.id,
            minecraftuuid,
          }).save();

          interaction
            .followUp({
              content: `added ${user.tag} as ${ign} to database\n disclaimer: this informations stored are your minecraft uuid and discord account id\nif you have a problem with this, please contact the developer.`,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
          if (typeof config.verify !== "undefined") {
            const verifyrole = config.verify;
            member.roles
              .add(verifyrole)
              .catch(() =>
                console.log(
                  `I don't have permission to add ${verifyrole} in ${guildId}`
                )
              );
          }
        } else if (
          linkedtag ==
          "there was an error while trying to fetch the discord tag"
        ) {
          interaction
            .followUp({
              content: `the account either has no specified account or the username you provided is wrong`,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
        } else {
          interaction
            .followUp({
              content: ` discord account is not linked to the specified minecraft account `,
            })
            .catch(() =>
              console.log(
                `I don't have permission to send a message in ${channel} in ${guild.name}`
              )
            );
          return;
        }
      } else {
        //update db command
        if (userId != userInfo.userId) {
          if ((uuidInfo.length = 0)) {
            return interaction
              .followUp({
                content: `that user isn't linked, please use the verify command`,
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          }

          if ((userInfo.length = 0)) {
            return interaction
              .followUp({
                content: `that user isn't linked, please use the verify command`,
                ephemeral: true,
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          }

          if (usertag == linkedtag) {
            verifyModel.find;
            verifyModel.updateOne(
              { minecraftuuid: `${minecraftuuid}` },
              {
                $set: { userId: `${userId}` },
                function(err, doc) {
                  if (err)
                    return interaction.followUp({
                      content: `there was an error while trying to update values`,
                    });
                },
              }
            );
            interaction.followUp({ content: `Successfully set new value` });

            const verifyrole = config.verify;
            if (typeof verifyrole !== "undefined") {
              if (!member.roles.cache.has(verifyrole)) {
                member.roles
                  .add(verifyrole)
                  .catch(() =>
                    console.log(
                      `I don't have permission to add ${verifyrole} in ${guildId}`
                    )
                  );
              }
            }
          } else if (
            linkedtag ==
            "there was an error while trying to fetch the discord tag"
          ) {
            interaction
              .followUp({
                content: `the account either has no specified account or the username you provided is wrong`,
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
          } else {
            interaction
              .followUp({
                content: ` discord account is not linked to the specified minecraft account\n if it hasn't been a long time since you changed your linked account, you should wait for the api to update `,
              })
              .catch(() =>
                console.log(
                  `I don't have permission to send a message in ${channel} in ${guild.name}`
                )
              );
            return;
          }
        } else {
          return interaction.followUp({
            content: `the account that is currently linked is the same as your current account`,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
});
