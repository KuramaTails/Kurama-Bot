const { MessageEmbed} = require("discord.js");
module.exports = {
	execute(queue,player) {
        var listchannels = queue.clientMember.guild.channels.cache
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case `player-room`:
                    var textchannel = listchannels.get(keyschannels[i])
                    break;
            }	
        }
        let playlist = player.queues.collection.first().songs;
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Playing: \`${playlist[0].name}\``)
        .setThumbnail(`${playlist[0].thumbnail}`)
        .setURL(`${playlist[0].url}`)
        .setDescription(`Duration: \`${playlist[0].formattedDuration}\`\n`)
        var allmessages = textchannel.messages.cache
        var keysmessages = Array.from(allmessages.keys())
        for (let i = 0; i < keysmessages.length; i++) {
            if (allmessages.get(keysmessages[i]).embeds.length > 0) {
                allmessages.get(keysmessages[i]).edit({embeds: [Embedsearch]});
            }
        }	
    }
};