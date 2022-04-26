module.exports = {
	name: "join",
    command:"join",
    desc:'Bot will join your voice channel!',
    example:"/player join",
	async execute(interaction,player,lang,voiceChannel) {
		var joinedChannnels = Array.from(player.voices.collection.keys())
		var stringErr = lang.get(interaction.guild.settings.lang).commands.player.commands.errors["join"]
		var stringJoin = lang.get(interaction.guild.settings.lang).commands.player.commands["join"]
		var alreadyJoined
		joinedChannnels.forEach(channel=> {alreadyJoined = channel.id=voiceChannel? true : ""})
		alreadyJoined==undefined? (interaction.followUp({content: stringJoin,ephemeral: true}),player.voices.join(voiceChannel)) : interaction.followUp({content: stringErr,ephemeral: true}) 
	},
};