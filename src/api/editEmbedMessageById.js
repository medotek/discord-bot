function editEmbedMessageById(app, client) {
    app.post('/discord/edit-embed', (req, res) => {
        try {
            let channelId = null;
            let serverId = null;
            const embeds = [];

            if (req.query.serverId) {
                serverId = req.query.serverId
            }

            if (req.body.embeds) {
                let parsedEmbed = JSON.parse(req.body.embeds);

                if (parsedEmbed) {
                    parsedEmbed.forEach((item) => {
                        // Initialize embed object
                        let embed = {
                            title: item.title ?? '',
                            color: item.color ?? '',
                            author: {
                                name: item.author.name ?? '',
                                url: item.author.url ?? '',
                                icon_url: item.author.icon_url ?? '',
                            },
                            timestamp: item.timestamp ?? '',
                            description: item.description ?? '',
                            url: item.url ?? '',
                            image: item.image ?? '',
                            footer: item.footer ?? '',
                        }

                        embeds.push(embed);
                    })
                }
            }

// Send embedMessage
            if (embeds && channelId) {
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
                                    let messageId = req.body.id;
                                    channel.messages.fetch(messageId).then(r => {
                                        embeds.forEach((embed) => {
                                            r.send({
                                                "embed": embed
                                            }).then(success => {
                                                console.log('message edited')
                                                res.sendStatus(200);
                                            }).catch(error => {
                                                console.log('message not edited')
                                                res.sendStatus(400);
                                            });
                                        })
                                    })
                                }
                            }
                        }
                    }
                }
            } else {
                res.send("The embed is empty");
                res.sendStatus(400);
            }
        } catch (error) {
            console.error('Error trying to edit a message: ', error);
            res.sendStatus(400);
        }
    })
}

module.exports = {editEmbedMessageById};