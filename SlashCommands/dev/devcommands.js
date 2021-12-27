const { Command } = require("reconlx");

module.exports = new Command({
  name: "dev",
  description: "dev only commands, allows some random but pretty cool stuff",
  devonly: true,
  options: [
    {
      name: "action",
      type: "STRING",
      description: "the action the command will execute",
      required: "true",
    },
    {
      name: "integer-option",
      type: "INTEGER",
      description: "provides an integer option if the command requires it",
      required: false,
    },
    {
      name: "int-option2",
      type: "INTEGER",
      description: "provides an integer option",
      required: false,
    },
    {
      name: "int-option3",
      type: "INTEGER",
      description: "provides an integer option",
      required: false,
    },
    {
      name: "string-option",
      type: "STRING",
      description: "provides a string option if the command requires it",
      required: false,
    },
  ],

  run: async ({ interaction, client }) => {
      const action = interaction.options.getString("action");
      const integerOption = interaction.options.getInteger("integer-option");
      const integerOption2 = interaction.options.getInteger("int-option2");
      const integerOption3 = interaction.options.getInteger("int-option3");
      const stringOption = interaction.options.getString("string-option");

      if (action == "meme") {
        const memeStash = {
          1: `https://cdn.discordapp.com/attachments/163382741491122176/894176854406230066/d64e7d41e9c1bde6a765a38068030b57.mp4`,
          2: `https://cdn.discordapp.com/attachments/788052445217030154/894307942743035995/unknown.png`,
          3: `https://cdn.discordapp.com/attachments/779549891890118686/893516964989898752/Sound_like_skill_issue-7iYEbHBwNYY.mp4`,
          4: `https://cdn.discordapp.com/attachments/832652653292027904/892331846854131732/video0.mov`,
          5: `https://cdn.discordapp.com/attachments/747677333778989096/890996024489959544/Time18-18-08.mp4`,
          6: `https://cdn.discordapp.com/attachments/163382741491122176/882191726624788490/Car_piggies.mp4`,
          7: `https://cdn.discordapp.com/attachments/163382741491122176/881484043739365376/9540a472f33c89ce.mp4`,
          8: `https://cdn.discordapp.com/attachments/797509748651196426/877497232985817139/slipgate.mp4`,
          9: `https://cdn.discordapp.com/attachments/758015919925755955/879035435081424936/Boris_here_to_help.mp4`,
          10: `https://cdn.discordapp.com/attachments/832652653292027904/876496833076166736/haha_no.mp4`,
          11: `https://cdn.discordapp.com/attachments/490601755000963093/872560685064810576/video0.mp4`,
          12: `https://cdn.discordapp.com/attachments/747677333778989096/831202956694913024/video0.mp4`,
          13: `https://cdn.discordapp.com/attachments/742112975069904929/844944909756530729/video0-26.mp4`,
          14: `https://cdn.discordapp.com/attachments/854495809633648650/855688922750517248/video1.mp4`,
          15: `https://cdn.discordapp.com/attachments/832652653292027904/895752558088425472/video0.mp4`,
          16: `https://cdn.discordapp.com/attachments/670808913590878227/896524177773838346/video0-1.mp4`,
          17: `https://cdn.discordapp.com/attachments/832652653292027904/897851714789572659/IP_address_moment.mp4`,
          18: `https://cdn.discordapp.com/attachments/832652653292027904/898300203289944125/how_do_you_breathe.mp4`,
          19: `https://cdn.discordapp.com/attachments/832652653292027904/898572732592173076/video0-230-1.mp4`,
          20: `https://cdn.discordapp.com/attachments/832652653292027904/898573409548636220/BIG_CHUNGUS_2_-_Song_by_Endigo.webm`,
          21: `https://cdn.discordapp.com/attachments/549024379791474779/887392240299819098/video0.mov`,
          22: `https://cdn.discordapp.com/attachments/855822241333772308/898788219192213524/video0.mov`,
          23: `https://www.reddit.com/r/HypixelSkyblock/comments/q9l8p1/it_would_be_a_shame_if_your_hype_got_voided/`,
          24: `https://cdn.discordapp.com/attachments/855822241333772308/904774315646517349/teris.mp4`,
        };
        let number;
        if (integerOption == null) {
          number =
            Math.floor(Math.random() * Object.keys(memeStash).length - 1) + 1;
        } else {
          number = integerOption;
        }

        if (typeof memeStash[number] === "undefined")
          return interaction.followUp({
            content: `there isn't an option ${number} available currently please choose from option 1 to ${
              Object.keys(memeStash).length
            }`,
          });
        interaction.followUp({ content: memeStash[number] }).catch(() => null);
      } else if (action == "setusername") {
        if (stringOption !== null) {
          client.user.setUsername(stringOption).catch(() => null);
          interaction
            .followUp({
              content: `successfully set bot name to ${stringOption}`,
            })
            .catch(() => null);
          console.log(
            `username was updated to ${stringOption} from ${client.user.tag}, by ${interaction.user.tag}`
          );
        } else {
          interaction.followUp({ content: `you need to set a string option` });
        }
      } else if (action == "getPermissionlist") {
        const guild = interaction.guild;
        const perms = guild.me.permissions.toArray();
        if (perms.includes("ADMINISTRATOR")) {
          return interaction
            .followUp({ content: `ADMINISTRATOR permission` })
            .catch(() => console.log())
            .catch(() => null);
        }

        interaction
          .followUp({ content: `\`\`${perms.toString()}\`\`` })
          .catch(() => console.log())
          .catch(() => null);
      } else {
        interaction
          .followUp({
            content: `there's no ${action} currently`,
            allowedMentions: { parse: [] },
          })
          .catch(() => null);
      }
  },
});
