const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription("Select player's volume!")
        .addStringOption(option =>
            option.setName("volume")
            .setDescription("Set volume percentage")
            .setRequired(true)
            ),
        
	async execute(interaction,player) {
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    let volume = interaction.options.getString("volume")
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