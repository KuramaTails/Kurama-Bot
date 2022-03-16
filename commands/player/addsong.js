module.exports = {
    name: "addsong",
    command:"Addsong",
    desc:'Bot will add a song to queue',
    example:"/player addsong <link or title>",
	async execute(interaction,player) {
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                let link = interaction.options.getString("link")
                await player.play(voiceChannel, link)
                var queue = await player.queues.get(voiceChannel)
                let addedsong = queue.songs[queue.songs.length-1]
                interaction.followUp({
                    content: `Added ${addedsong.name} - \`${addedsong.formattedDuration}\` to the queue`,
                    ephemeral: true
                })
            }
            else { 
                interaction.followUp({
                    content: "You must join a voice channel first.",
                    ephemeral: true
                })
            }
        } catch (error) {
            console.log(error)
        }
	},
};