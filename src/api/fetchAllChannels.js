const {getChannelIDs} = require("../getAllChannels");

function fetchAllChannels(app, client) {
    app.get('/discord/get-channels', (req, res) => {
        let channels = getChannelIDs(client, req.query.serverId);
        res.send(channels);
    })
}

module.exports = {fetchAllChannels};

