const { MessageEmbed} = require("discord.js");
const playerSchema = require('../../schemas/player-schema');
const dbconnect = require('../../db/dbconnect');
const dbdisconnect = require("../../db/dbdisconnect");
const bot = require("../../../bot");
module.exports = {
    name: 'addSong',
	async execute(queue) {
        await dbconnect()
        var selectGuild = await playerSchema.find({ "_id" : queue.clientMember.guild.id})
        await dbdisconnect()
        if (!selectGuild) {return}
        else {
            var textChannel = selectGuild[0].channelId
            var listchannels = queue.clientMember.guild.channels.cache
            let playerChannel = await listchannels.find(channel => channel.id === textChannel )
            let playlist = bot.player.queues.collection.first().songs;
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(bot.lang.get(queue.clientMember.guild.lang).commands.player.embeds["playing"]+`: \`${playlist[0].name}\``)
            .setThumbnail(`${playlist[0].thumbnail}`)
            .setURL(`${playlist[0].url}`)
            .setDescription(bot.lang.get(queue.clientMember.guild.lang).commands.player.embeds["duration"]+`: \`${playlist[0].formattedDuration}\`\n`)
            var allmessages = await playerChannel.messages.fetch()
            let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
            selectedMessage.edit({embeds: [Embedsearch]});	
        }
    }
};