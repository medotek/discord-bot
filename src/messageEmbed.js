const { MessageEmbed } = require('discord.js');

/**
 * @param embeds
 * @param channelId
 * @param client
 */
function sendMessageEmbed(embeds, channelId, client) {
    const channel = client.channels.cache.get(channelId);

    embeds.forEach((embed) => {
        channel.send({
            "embed": embed
        })
            .then(r => console.log(r))
            .catch(err => {
            console.log(err)
        })
    });
}

module.exports = {sendMessageEmbed};