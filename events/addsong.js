const { MessageEmbed} = require("discord.js");
const playerSchema = require('../schemas/player-schema');
const dbconnect = require('./dbconnect');
const cache = {}
module.exports = {
	async execute(queue,player) {
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
        let playlist = player.queues.collection.first().songs;
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Playing: \`${playlist[0].name}\``)
        .setThumbnail(`${playlist[0].thumbnail}`)
        .setURL(`${playlist[0].url}`)
        .setDescription(`Duration: \`${playlist[0].formattedDuration}\`\n`)
        var allmessages = await playerChannel.messages.fetch()
        let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
        selectedMessage.edit({embeds: [Embedsearch]});	
    }
};