module.exports = { 
	async execute(interaction,player) {
        try {
            var voiceChannel = interaction.member.voice.channel
            var mode
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    switch(parseInt(interaction.options.getString("mode"))) {
                        case 0:
                            player.setRepeatMode(voiceChannel, 1)
                            mode = "DISABLED"
                            interaction.followUp({
                                content: "Set repeat mode to `" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 1:
                            player.setRepeatMode(voiceChannel, 2)
                            mode = "SONG"
                            interaction.followUp({
                                content: "Set repeat mode to `" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 2:
                            player.setRepeatMode(voiceChannel, 0)
                            var mode = "QUEUE"
                            interaction.followUp({
                                content: "Set repeat mode to `" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        default:
                            interaction.followUp({
                                content: "Please provide an available loop mode: DISABLED = 0, SONG = 1 , QUEUE = 2 ",
                                ephemeral: true
                            })
                            break;
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