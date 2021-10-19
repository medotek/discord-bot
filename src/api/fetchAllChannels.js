const {getChannelIDs} = require("../getAllChannels");

function fetchAllChannels(app, client) {
    app.get('/get-channels', (req, res) => {
        let channels = getChannelIDs(client);
        // channels.forEach((item) => {
        //     res.send(item);
        // })
        res.send(channels);
    })
}

module.exports = {fetchAllChannels};

