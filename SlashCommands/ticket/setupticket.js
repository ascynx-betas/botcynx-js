const { Command } = require("reconlx");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const disabled = require("../../personal-modules/testfor");
const ticketmodel = require("../../models/ticket");
const bc = require('../../personal-modules/bitfieldcalc')

module.exports = new Command({
  name: "setup-ticket",
  description: "used to setup a ticket system",
  userPermissions: ["MANAGE_CHANNELS"],
  options: [
    {
      name: "channel",
      description: "the channel where the ticket system will be based in",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "config-name",
      description: "the name the config will be refered to in the commands",
      required: true,
      type: "STRING",
    },
    {
      name: "welcome-message",
      description:
        "the message that will be displayed when creating a new ticket",
      required: true,
      type: "STRING",
    },
    {
      name: "description",
      description:
        "the description that will be shown above the create ticket button",
      required: false,
      type: "STRING",
    },
  ],

  run: async ({ interaction, client }) => {
    const guildId = interaction.guild.id;
    const setupchannel = interaction.options.getChannel("channel");
    const name = interaction.options.getString("config-name");
    const welcome = interaction.options.getString("welcome-message");
    const welcomebutton = interaction.options.getString("description");
    let permissions = Number(interaction.guild.me.permissions);
    permissions = bc.permissions(permissions);
    if (!permissions.includes('USE_PRIVATE_THREADS') && !permissions.includes('USE_PUBLIC_THREADS') && !permissions.includes('ADMINISTRATOR')) return interaction.followUp('Missing permissions to create threads').catch(() => null)
    try {
      const blacklisted = client.config.tbn;
      const success = disabled.testfor(blacklisted, name);
      if (success == true) {
        return interaction.followUp({
          content: `You can't name a config by the name ${name}`,
        });
      }
      const buttonrow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`${name}`)
          .setLabel("create ticket")
          .setStyle("SUCCESS")
      );

      const embed = new MessageEmbed()
        .setColor(`#69696E`)
        .setDescription(
          `${
            welcomebutton ||
            "press create to enter in contact with staff members"
          }`
        );

      let sent = await setupchannel
        .send({ embeds: [embed], components: [buttonrow] })
        .then(() =>
          interaction.followUp(
            `success, successfully created a new ticket system in ${setupchannel}`
          )
        )
        .catch(() =>
          interaction.followUp({
            content:
              "I don't have permission to send a message in the specified channel",
            ephemeral: true,
          })
        );
      const existing = await ticketmodel.find({
        name: name,
        guildId: guildId,
      });
      if (!existing || existing.length == 0) {
        new ticketmodel({
          channel: setupchannel.id,
          name: name,
          welcomemessage: welcome,
          linkedmessage: sent.id,
          guildId: guildId,
        }).save();
      }
    } catch (err) {
      console.log(err);
    }
  },
});
