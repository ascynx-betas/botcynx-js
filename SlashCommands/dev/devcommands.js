const { Command } = require('reconlx');

module.exports = new Command ({
    name: 'dev',
    description: 'dev only commands, allows some random but pretty cool stuff',
    devonly: true,
    options: [
        {
            name: 'action',
            type: 'STRING',
            description: 'the action the command will execute',
            required: 'true'
        },
        {
            name: 'integer-option',
            type: 'INTEGER',
            description: 'provides an integer option if the command requires it',
            required: false,
        },
        {
            name: 'int-option2',
            type: 'INTEGER',
            description: 'provides an integer option',
            required: false,
        },
        {
            name: 'int-option3',
            type: 'INTEGER',
            description: 'provides an integer option',
            required: false,
        },
        {
            name: 'string-option',
            type: 'STRING',
            description: 'provides a string option if the command requires it',
            required: false,
        }
    ],

    run: async ({ interaction, client }) => {
        try {

        const action = interaction.options.getString('action');
        const integerOption = interaction.options.getInteger('integer-option');
        const integerOption2 = interaction.options.getInteger('int-option2');
        const integerOption3 = interaction.options.getInteger('int-option3');
        const stringOption = interaction.options.getString('string-option');
        if (action == 'meme') {
            if (integerOption == null) {
            var number = Math.floor(Math.random()*23) +1;
            } else {
                var number = integerOption
            }
            if (number == 1) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/163382741491122176/894176854406230066/d64e7d41e9c1bde6a765a38068030b57.mp4`});
            } else if (number == 2) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/788052445217030154/894307942743035995/unknown.png`});
            } else if (number == 3) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/779549891890118686/893516964989898752/Sound_like_skill_issue-7iYEbHBwNYY.mp4`});
            } else if (number == 4) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/832652653292027904/892331846854131732/video0.mov`});
            } else if (number == 5) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/747677333778989096/890996024489959544/Time18-18-08.mp4`});
            } else if (number == 6) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/163382741491122176/882191726624788490/Car_piggies.mp4`});
            } else if (number == 7) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/163382741491122176/881484043739365376/9540a472f33c89ce.mp4`});
            } else if (number == 8) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/797509748651196426/877497232985817139/slipgate.mp4`});
            } else if (number == 9) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/758015919925755955/879035435081424936/Boris_here_to_help.mp4`});
            } else if (number == 10) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/832652653292027904/876496833076166736/haha_no.mp4`});
            } else if (number == 11) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/490601755000963093/872560685064810576/video0.mp4`});
            } else if (number == 12) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/747677333778989096/831202956694913024/video0.mp4`});
            } else if (number == 13) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/742112975069904929/844944909756530729/video0-26.mp4`});
            } else if (number == 14) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/854495809633648650/855688922750517248/video1.mp4`});
            } else if (number == 15) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/832652653292027904/895752558088425472/video0.mp4`});
            } else if (number == 16) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/670808913590878227/896524177773838346/video0-1.mp4`});
            } else if (number == 17) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/832652653292027904/897851714789572659/IP_address_moment.mp4`});
            } else if (number == 18) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/832652653292027904/898300203289944125/how_do_you_breathe.mp4`});
            } else if (number == 19) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/832652653292027904/898572732592173076/video0-230-1.mp4`});
            } else if (number == 20) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/832652653292027904/898573409548636220/BIG_CHUNGUS_2_-_Song_by_Endigo.webm`});
            } else if (number == 21) {
                interaction.followUp({content: `https://cdn.discordapp.com/attachments/549024379791474779/887392240299819098/video0.mov`});
            } else if (number == 22) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/855822241333772308/898788219192213524/video0.mov`});
            } else if (number == 23) {
                interaction.followUp({content:`https://www.reddit.com/r/HypixelSkyblock/comments/q9l8p1/it_would_be_a_shame_if_your_hype_got_voided/`});
            } else if (number == 24) {
                interaction.followUp({content:`https://cdn.discordapp.com/attachments/855822241333772308/904774315646517349/teris.mp4`});
            } else {
                interaction.followUp({content:`there is no more than 24 options currently :)`})

                //************* */
                //change the meme stash to an array would be a better option
                //************ */
            }
        } else if (action == 'mee6level') {
          interaction.followUp({content: `this is not coded in yet`})
            const chosenlevel = integerOption2
            const currentlevel = integerOption
            const overflowexp = integerOption3
          var level = 0;
          var levelexp = 5*(level*level)+(50*level)+100;
            var oldlevel = levelexp
            var fullexp = oldlevel+levelexp

            const levelchosen = new Promise(function(resolve, reject) {
                function foo() {
                    if (typeof level == 'undefined') {
                       var level = 0;
                    }
                    if (typeof foo.oldlevel != 'undefined') {
                        var oldlevel = 0;
                    }
                    var levelc = levelexp + oldlevel
                    var levelexp = 5*(level*level)+(50*level)+100;
                    var oldlevel = levelexp
                    if (level < chosenlevel) {
                        foo(level + 1);
                        window.setTimeout(foo, 1000)
                    }
                }
                //need to fix the fact that it can't take the value from the function inside

                if (level >= chosenlevel) {
                    resolve(levelc);
                } else {
                    reject(`promise failed`);
                }
            });


            const levelcurrent = new Promise(function(resolve, reject) {
                function foo() {
                    if (typeof level == 'undefined') {
                       var level = 0;
                    }
                    if (typeof oldlevel != 'undefined') {
                        var oldlevel = 0;
                    }

                    var clevel = levelexp + oldlevel
                    var levelexp = 5*(level*level)+(50*level)+100;
                    var oldlevel = clevel

                    if (level < currentlevel) {
                        foo(level + 1);
                        window.setTimeout(foo, 1000)
                    }
                    //need to fix the fact that it can't take the value from the function inside
                }

                    if (level >= currentlevel) {
                        resolve(clevel);
                    } else {
                        reject(`promise failed`)
                    }
            });


            const calculated = levelchosen - (clevel + overflowexp)


            
        }else if (action == 'setusername'){
            if (stringOption !== null) {
                client.user.setUsername(stringOption).catch(() => console.log())
                interaction.followUp({content: `successfully set bot name to ${stringOption}`}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                console.log(`username was updated to ${stringOption} from ${client.user.tag}, by ${interaction.user.tag}`)
            } else {
                interaction.followUp({content: `you need to set a string option`})
            }

     } else if (action == 'getPermissionlist') {
         const guild = interaction.guild
        const perms = guild.me.permissions.toArray();
        
        interaction.followUp({content:`\`\`${perms.toString()}\`\``}).catch(() => console.log()).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))


    }else {
            interaction.followUp({content: `there's no ${action} currently`, allowedMentions: {parse :[]}}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
        }
    }catch (err) {console.log(err)};
}
})