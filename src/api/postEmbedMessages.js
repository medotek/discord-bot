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
                req.body.embeds.forEach((item) => {
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

            let message = {};
            if (req.body.message) {
                message = {
                    content: req.body.message.content ? req.body.message.content : ''
                }
                console.log(message);
            }

            let chanId = "";
            // Does channelId exist
            if (req.body.channel) {
                // do
                chanId = req.body.channel;
            }

            // Send embedMessage
            if (embeds && chanId) {
                sendMessageEmbed(embeds, chanId, client);
                res.sendStatus(200);
            } else {
                res.send("The embed is empty");
                res.sendStatus(400);
            }
            // sendWebhook();
        } catch (error) {
            console.error('Error trying to send a message: ', error);
            res.sendStatus(400);
        }
    });
}

module.exports = {postEmbedMessages}
