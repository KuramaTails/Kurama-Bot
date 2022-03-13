module.exports = {
	execute(queue,player) {
        var listchannels = queue.clientMember.guild.channels.cache
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case `player-room`:
                    var textchannel = listchannels.get(keyschannels[i])
                    textchannel.send('Finish queue! Player leaved vocal channel');
                    player.voices.leave(queue)
                    break;
            }	
        }
    }
};

