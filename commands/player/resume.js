module.exports = {
    name: "resume",
    command:"resume",
    desc:"Bot will resume playing!",
    example:"/player resume",
	async execute(interaction,player) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (player.queues.collection.first().paused) {
                        player.resume(voiceChannel)
                        interaction.followUp({
                            content: "Player resumed playing",
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