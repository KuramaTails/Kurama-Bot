const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Bot will leave your voice channel!'),
	async execute(interaction,player) {       
		var voiceChannel = Array.from(player.voices.collection.keys())
		for (let i = 0; i < voiceChannel.length; i++) {
			if (voiceChannel[i]= interaction.member.voice.channel)
			{
				await player.voices.leave(voiceChannel[i])
				interaction.followUp({
					content: "Player leave",
					ephemeral: true
				})
				return
			}
			else {
				interaction.followUp({
					content: "Player is not in your voice channel",
					ephemeral: true
				})
				return
			}
		}
		interaction.followUp({
			content: "Player is not in your voice channel",
			ephemeral: true
		})
	},
};