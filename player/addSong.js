module.exports = {
	execute(queue) {
        var listchannels = queue.clientMember.guild.channels.cache
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case `player-room`:
                    var textchannel = listchannels.get(keyschannels[i])
                    break;
            }	
        }
        let addedsong = queue.songs[queue.songs.length-1]
        textchannel.send({
            content: `Added ${addedsong.name} - \`${addedsong.formattedDuration}\` to the queue`
        })
    }
};