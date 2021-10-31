const { MessageEmbed } = require('discord.js');
/**
 * @param embeds
 * @param channelId
 * @param client
 */
function sendMessageEmbed(embeds, channelId, client) {
    // replace multiple quote
    const channel = client.channels.cache.get(channelId.replace(/"/g, ''));
    embeds.forEach((embed) => {
        channel.send({
            "embed": embed
        })
            .then(r => {
                console.log(messageId)
                res.send({status: 200, messageId: r.id});
            })
            .catch(err => {
            console.log(err)
        })
    });
}

module.exports = {sendMessageEmbed};