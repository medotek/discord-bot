function getEmbedMessageById(app, client) {
    app.post('/discord/get-embed', (req, res) => {
        try {
            let channelId = null;
            let serverId = null;
            let messageId = null;

            if (req.query.serverId) {
                serverId = req.query.serverId
            }

            if (req.body.id) {
                messageId = req.body.id;
            }

            if (req.body.channel) {
                channelId = req.body.channel;
            }

            if (messageId && channelId) {

                let servers = client.guilds.cache.array();
                for (let i = 0; i <= (servers.length - 1); i++) {
                    let server = servers[i];
                    if (serverId === server.id) {
                        let channels = server.channels.cache.array();
                        for (const channel of channels) {
                            if (channel.id === channelId) {
                                // console.log(server.emojis)
                                let messageExists = false;

                                function doesMessageExist() {
                                    channel.messages.fetch(messageId).then(r => {
                                        return true;
                                    }).catch(error => {
                                        console.log(error)
                                        return false;
                                    }).then(() => {
                                        res.send({
                                            status: 200,
                                            messagesToDelete: messageId
                                        })
                                    })
                                }

                                doesMessageExist();
                            }
                        }
                    }
                }
            } else {
                return new Promise((doesMessageExist) => {
                    setTimeout(() => {
                            if (doesMessageExist()) {
                                res.send("The message exists");
                                res.sendStatus(400)
                            } else {
                                doesMessageExist()
                            }
                        }
                        , 3000);
                })
            }
        } catch (error) {
            console.error('Error trying to edit a message: ', error);
            res.sendStatus(400);
        }
    })
}

module.exports = {getEmbedMessageById};