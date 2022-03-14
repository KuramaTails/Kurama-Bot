const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Bot will skip this song!'),
	async execute(interaction,player) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (player.queues.collection.first().songs.length>1) {
                        player.skip(voiceChannel)
                        interaction.followUp({
                            content: "Song skipped",
                            ephemeral: true
                            })
                    }
                    else {
                        player.voices.leave(voiceChannel)
                        interaction.followUp({
                            content: "Leaved the voice channel, no more songs in queue",
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