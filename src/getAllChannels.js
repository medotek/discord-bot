function getChannelIDs(client)
{
    let channelsArr = [];
    try{
        let channels = client.channels.cache.array();
        for (const channel of channels)
        {
            let chan = {
                id: channel.id,
                name: channel.name
            }

            channelsArr.push(chan)
        }}catch(err){
        console.log(err)
    }

    return channelsArr;
}

module.exports = { getChannelIDs }