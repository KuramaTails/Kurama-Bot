module.exports = {
    name: "pause",
    command:"pause",
    desc:'Bot will pause playing!',
    example:"/player pause",
	async execute(interaction,player) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (!player.queues.collection.first().paused) {
                        player.pause(voiceChannel)
                        interaction.followUp({
                            content: "Player paused",
                            ephemeral: true
                        })
                    }
                }
                else {
                    interaction.followUp({
                        content: "No songs in queue.",
                        ephemeral: true
                    })
                }
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