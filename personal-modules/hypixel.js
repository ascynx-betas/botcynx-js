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


module.exports = {
    getDiscord, getuuid
}