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
        guild.channels.fetch(textchannel.id).then(async channel => {
            let lenght = player.queues.collection.first().songs.length
            let addedsong = player.queues.collection.first().songs[lenght-1]
            channel.send(`Added ${addedsong.name} - \`${addedsong.formattedDuration}\` to the queue`);
        })
    }
};