const {sendMessageEmbed} = require('../messageEmbed');
const {channelId} = require('../../config.json');

/**
 * Send message on api POST callback
 * @param app
 * @param client
 */
function postEmbedMessages(app, client) {

    app.post('/post-test', (req, res) => {
        try {
            const embeds = [];
            if (req.body.embeds) {
                req.body.embeds.forEach((item) => {
                    let embed = {
                        title: item.title ? item.title : '',
                        color: item.color ? item.color : '',
                        author: {
                            name: item.author.name ? item.author.name : '',
                            url: item.author.url ? item.author.url : '',
                            icon_url: item.author.icon_url ? item.author.icon_url : '',
                        },
                        description: item.description ? item.description : '',
                        url: item.url ? item.url : '',
                        image: item.image ? item.image : '',
                        footer: item.footer ? item.footer : '',
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

            // Send embedMessage
            sendMessageEmbed(embeds, channelId, client);

            res.sendStatus(200);
            // sendWebhook();
        } catch (error) {
            console.error('Error trying to send a message: ', error);
            res.sendStatus(400);
        }
    });
}

module.exports = {postEmbedMessages}
