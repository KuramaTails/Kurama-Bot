const { MessageEmbed } = require("discord.js");

module.exports = {
	async execute(queue,player) {
        var listchannels = queue.clientMember.guild.channels.cache
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case `player-room`:
                    var textchannel = listchannels.get(keyschannels[i])
                    player.voices.leave(queue)
                    break;
            }	
        }
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`No songs playing right now`)
        .setThumbnail(``)
        .setURL(``)
        .setDescription(``)
        var allmessages = await textchannel.messages.fetch()
        var keysmessages = Array.from(allmessages.keys())
        for (let i = 0; i < keysmessages.length; i++) {
            if (allmessages.get(keysmessages[i]).embeds.length > 0) {
                allmessages.get(keysmessages[i]).edit({embeds: [Embedsearch]});
            }
        }	
    }
};


