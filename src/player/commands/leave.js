module.exports = {
	name: "leave",
    command:"leave",
    desc:'Bot will leave your voice channel!',
    example:"/player leave",
	async execute(interaction,player,lang) {       
		var voiceChannel = Array.from(player.voices.collection.keys())
		for (let i = 0; i < voiceChannel.length; i++) {
			if (voiceChannel[i]= interaction.member.voice.channel)
			{
				await player.voices.leave(voiceChannel[i])
				interaction.followUp({
					content: lang.get(interaction.guild.lang).commands.player.commands["leave"],
					ephemeral: true
				})
				return
			}
			else {
				interaction.followUp({
					content: lang.get(interaction.guild.lang).commands.player.commands.errors["leave"],
					ephemeral: true
				})
				return
			}
		}
		interaction.followUp({
			content: lang.get(interaction.guild.lang).commands.player.commands.errors["leave"],
			ephemeral: true
		})
	},
};