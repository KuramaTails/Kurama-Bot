module.exports = {
	async execute(interaction,player) {
        var voicechannel = interaction.member.voice.channel
        if(voicechannel) {
            let link = interaction.options.getString("link")
            await player.play(voicechannel, link)
            var queue = player.queues.get(voicechannel)
            let addedsong = queue.songs[queue.songs.length-1]
            interaction.followUp({
                content: `Playing ${addedsong.name} - \`${addedsong.formattedDuration}\``,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: "You must join a voice channel first.",
                ephemeral: true
            })
        }
	},
};