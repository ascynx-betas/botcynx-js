import * as fetch from 'node-fetch'



const base = `api.hypixel.net/`
const apikey = config.hypixelapikey
const api = `key=${apikey}`

async function getplayer(uuid) {


const response = await fetch(link[{
    headers: { }
}])
const data = await response.json()
const rank = data.rank

return rank;
}

module.exports = {
    getplayer
}

// I'll have to fix this later
// currently missing the API header + api var call
//  and the link itself, also I'm not sure import'll work