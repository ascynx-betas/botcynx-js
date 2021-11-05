const fs = require('fs');
const client = require("../index");

client.on("guildCreate", (guild) => {
    try {
    const guildId = guild.id
    const filepath = (`guild-only/${guildId}/`)
    const filename = 'config.json'
    const template = `{
            "name": "${guild.name}",
            "guildId": "${guild.id}",
            "trigger": [""],
            "bypass": [""],
            "removable": [""],
            "logchannel": "",
            "su": [""]
    }`
    fs.open(`${filepath}`, (err) => {
        if (err) {
            console.log(err)
        }
        })

    fs.mkdirSync(filepath)
            fs.writeFileSync(`${filepath}${filename}`, `${template}`, (err) => {
                if (err) {
                    console.log(err)
                }
            
                console.log("file was successfully created at specified path")
            }).catch(() => console.log(`error happened`))
    }catch (err) {console.log(err)}

})
