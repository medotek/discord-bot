/**
 * Get channels id by server id
 * @param client Client
 * @param serverId string
 * @returns {*[]}
 */
function getChannelIDs(client, serverId) {
    let channelsArr = [];
    try {
        let servers = client.guilds.cache.array();
        for (let i = 0; i <= (servers.length - 1); i++) {
            let server = servers[i];
            if (serverId === server.id) {
                let channels = server.channels.cache.array();
                for (const channel of channels) {
                    if (channel.isText()) {
                        let oniChan = {
                            id: channel.id,
                            name: channel.name
                        }
                        channelsArr.push(oniChan)
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
    }

    return channelsArr;
}

module.exports = {getChannelIDs}