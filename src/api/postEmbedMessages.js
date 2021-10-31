const {sendMessageEmbed} = require('../messageEmbed');

/**
 * Send message on api POST callback
 * @param app
 * @param client
 */
function postEmbedMessages(app, client) {
    app.post('/discord/post-embed', (req, res) => {
        try {
            const embeds = [];
            if (req.body.embeds) {
                let parsedEmbed = JSON.parse(req.body.embeds);
                // let parsedEmbed = req.body.embeds;

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

            let channelId = null;
            if (req.body.channel) {
                channelId = req.body.channel;
            }

            let message = {};
            if (req.body.message) {
                message = {
                    content: req.body.message.content ?? ''
                }
            }


            // Send embedMessage
            if (embeds && channelId) {
                // replace multiple quote
                let channel = client.channels.cache.get(channelId.replace(/"/g, ''));
                embeds.forEach((embed) => {
                    channel.send({
                        "embed": embed
                    })
                        .then(r => {
                            res.send({status: 'success', messageId: r.id});
                        })
                        .catch(err => {
                            console.log(err)
                            res.sendStatus(400);
                        })
                });
            }
            else {
                res.send("The embed is empty");
                res.sendStatus(400);
            }

        } catch (error) {
            console.error('Error trying to send a message: ', error);
            res.sendStatus(400);
        }
    });
}

module.exports = {postEmbedMessages}
