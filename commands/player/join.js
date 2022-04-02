module.exports = {
	name: "join",
    command:"join",
    desc:'Bot will join your voice channel!',
    example:"/player join",
	async execute(interaction,player,lang) {
		var voiceChannel = Array.from(player.voices.collection.keys())
		for (let i = 0; i < voiceChannel.length; i++) {
			if (voiceChannel[i]= interaction.member.voice.channel)
			{
				interaction.followUp({
                    content: lang.get(interaction.guild.lang).commands.player.commands.errors["join"],
					ephemeral: true
				})
				return
			}
			else {
				await player.voices.join(voiceChannel[i])
				interaction.followUp({
                    content: lang.get(interaction.guild.lang).commands.player.commands["join"],
					ephemeral: true
				})
				return
			}
		}
		await player.voices.join(interaction.member.voice.channel)
		interaction.followUp({
			content: lang.get(interaction.guild.lang).commands.player.commands["join"],
			ephemeral: true
		})
	},
};