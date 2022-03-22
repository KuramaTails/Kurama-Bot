const { MessageEmbed} = require("discord.js");
const playerSchema = require('../schemas/player-schema');
const dbconnect = require('../db/dbconnect');
module.exports = {
	async execute(queue) {
        dbconnect()
        var selectGuild = await playerSchema.find({ "_id" : queue.clientMember.guild.id})
        dbdisconnnect()
        if (!selectGuild) {return}
        else {
            var textChannel = selectGuild[9].channelId
            var listchannels = queue.clientMember.guild.channels.cache
            let playerChannel = await listchannels.find(channel => channel.id === textChannel )
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

    }
};


