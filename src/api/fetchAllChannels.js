const {getChannelIDs} = require("../getAllChannels");

function fetchAllChannels(app, client) {
    app.get('/discord/get-channels', (req, res) => {
        let channels = getChannelIDs(client, req.param('serverId'));
        res.send(channels);
    })
}

module.exports = {fetchAllChannels};

