const channelsSchema = require('../schemas/channels-schema');

module.exports = {
    async execute(guild) {
        var channels = await guild.channels.fetch()
        var listChannels = new Map()
        channels.forEach(channel => {
            var channelId= channel.id
            var channelObj = {
                type: channel.type,
                name: channel.name,
            }
            listChannels.set(channelId,channelObj)
        });
        try {
            await channelsSchema.findOneAndUpdate({
                _id:guild.id,
            }, { 
                channels: listChannels
            },
            {
                upsert:true,
            })
        } catch (error) {
            console.log(error)
        }
        
    }
};
