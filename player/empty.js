module.exports = {
	async execute(guild,player) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case `player-room`:
                    var textchannel = listchannels.get(keyschannels[i])
                    break;
            }	
        }
        textchannel.send("The voice channel is empty! Leaving the voice channel...")
    }
};


