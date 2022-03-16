module.exports = {
    name: "previous",
    command:"previous",
    desc:'Bot will play previous song!',
    example:"/player previous",
	async execute(interaction,player) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (player.queues.collection.first().previousSongs.length) {
                        player.previous(voiceChannel);
                        interaction.followUp({
                            content: "Playing previous song",
                            ephemeral: true
                        })
                    }
                    else {
                        interaction.followUp({
                            content: "No previous songs in queue",
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