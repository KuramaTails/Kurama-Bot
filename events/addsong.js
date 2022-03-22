const { MessageEmbed} = require("discord.js");
const playerSchema = require('../schemas/player-schema');
const dbconnect = require('../db/dbconnect');
module.exports = {
	async execute(queue,player) {
        dbconnect()
        var selectGuild = await playerSchema.find({ "_id" : queue.clientMember.guild.id})
        dbdisconnnect()
        if (!selectGuild) {return}
        else {
            var textChannel = selectGuild[9].channelId
            var listchannels = queue.clientMember.guild.channels.cache
            let playerChannel = await listchannels.find(channel => channel.id === textChannel )
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
    }
};