const channelsSchema = require('../schemas/channels-schema');
const dbconnect = require('./dbconnect');

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
        await dbconnect().then(async (mongoose)=> {
            try {
                await channelsSchema.findOneAndUpdate({
                    _id:guild.id,
                }, {
                    _id:guild.id,
                    listChannels,
                },
                {
                    upsert:true,
                })
            } finally {
                mongoose.connection.close()
                console.log("Disconnected from database")
            }
        })
        
    }
};
