const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Bot will join your voice channel!'),
	async execute(interaction,player) {
		var voiceChannel = Array.from(player.voices.collection.keys())
		for (let i = 0; i < voiceChannel.length; i++) {
			if (voiceChannel[i]= interaction.member.voice.channel)
			{
				interaction.followUp({
					content: "Player is already in this voice channel.",
					ephemeral: true
				})
				return
			}
			else {
				await player.voices.join(voiceChannel[i])
				interaction.followUp({
					content: "Player joined",
					ephemeral: true
				})
				return
			}
		}
		await player.voices.join(interaction.member.voice.channel)
		interaction.followUp({
			content: "Player joined",
			ephemeral: true
		})
	},
};