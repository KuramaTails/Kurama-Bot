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
        guild.channels.fetch(textchannel.id)
        .then(channel => {
            timeoutID = setTimeout(() => {
                channel.send('Finish queue! Player leaved vocal channel');
                var tempvoice = bot.voice.adapters
                var tempvoiceid= Array.from(tempvoice.keys())
                player.voices.leave(tempvoiceid[0])
            }, 60*1000);
        })
    }
};

