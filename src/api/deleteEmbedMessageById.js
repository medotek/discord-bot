function deleteEmbedMessageById(app, client) {
    app.post('/discord/delete-embed', (req, res) => {
        try {
            let channelId = null;
            let serverId = null;

            if (req.query.serverId) {
                serverId = req.query.serverId
            }

            if (req.body.channel) {
                channelId = req.body.channel;

                let servers = client.guilds.cache.array();
                for (let i = 0; i <= (servers.length - 1); i++) {
                    let server = servers[i];
                    if (serverId === server.id) {
                        let channels = server.channels.cache.array();
                        for (const channel of channels) {
                            if (channel.id === channelId) {
                                let messageIds = []
                                if (req.body.ids) {
                                    // let messageIds = JSON.parse(req.body.ids);
                                    let messageIds = req.body.ids;

                                    messageIds.forEach(message => {
                                        let bool = false;
                                        channel.messages.fetch(message.id).then(r => {
                                            r.delete().then(success => {
                                                console.log('message deleted')
                                                res.sendStatus(200);
                                            }).catch(error => {
                                                console.log('message not deleted')
                                                res.sendStatus(400);
                                            });
                                        })
                                    })
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error trying to delete a message: ', error);
            res.sendStatus(400);
        }
    })
}

module.exports = {deleteEmbedMessageById};