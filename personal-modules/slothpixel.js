const slothpixel = require ("slothpixel");

async function getuuid(ign) {
    
    const query = `{
        players {
            player(player_name: "${ign}") {
                uuid
            }
        }
    }`;

    const data = await slothpixel.graphql({ query});
    const uuid = data.players.player.uuid
    return uuid;
}

async function getPlayer(ign) {

    const data = await slothpixel (`players/${ign}`)
    return data;
}

async function getDiscord(ign) {

    const query = `{
        players {
            player(player_name: "${ign}") {
                links {
                    DISCORD
                }
            }
        }
    }`;


const data = await slothpixel.graphql({ query });
const links = data.players.player.links
return links.DISCORD;
};

async function getOnline(ign) {
    
    const { online } = await slothpixel(`players/${ign}/status`);
    return online;
}

async function getOnlineActivity(ign) {


    const data = await slothpixel(`players/${ign}/status`);
    return data;    
}

module.exports = {
    getDiscord, getuuid, getOnline, getOnlineActivity, getPlayer
}