module.exports = {
    name: "volume",
    command:"volume",
    desc:"Select player's volume!",
    example:"/player volume [0-100]",
    async execute(interaction,player) {
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    let volume = interaction.options.getNumber("volume")
                    player.setVolume(voiceChannel, volume);
                    interaction.followUp({
                        content: "Set volume to `" + volume + "`",
                        ephemeral: true
                    })
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