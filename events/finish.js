const { MessageEmbed} = require("discord.js");
const playerSchema = require('../schemas/player-schema');
const dbconnect = require('./dbconnect');
const cache = {}
module.exports = {
	async execute(queue) {
        let data = cache[queue.clientMember.guild.id]
        if (!data) {
            console.log("Fetching from db")
            await dbconnect().then( async mongoose => {
                try {
                    const result = await playerSchema.findOne({_id:queue.clientMember.guild.id})
                    if (result) {
                        cache[queue.clientMember.guild.id] = data = [result.channelId]
                    }
                    else {
                        console.log(`No data set for ${queue.clientMember.guild.name}`)
                    }
                } finally {
                    mongoose.connection.close()
                    console.log("Closing connection to database")
                }
            })
        }
        if (!data) {
            return console.log(`Player hasn't been set in ${queue.clientMember.guild.name}`)
        }
        const textchannel= data[0]
        var listchannels = queue.clientMember.guild.channels.cache
        let playerChannel = await listchannels.find(channel => channel.id === textchannel )
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`No songs playing right now`)
        .setThumbnail(``)
        .setURL(``)
        .setDescription(``)
        var allmessages = await playerChannel.messages.fetch()
        let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
        selectedMessage.edit({embeds: [Embedsearch]});	
    }
};


