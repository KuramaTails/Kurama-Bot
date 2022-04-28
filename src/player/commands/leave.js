module.exports = {
	name: "leave",
    command:"leave",
    desc:'Bot will leave your voice channel!',
    example:"/player leave",
	async execute(interaction,player,lang,voiceChannel) {
		var joinedChannnels = Array.from(player.voices.collection.keys())
		var stringerr = lang.get(interaction.guild.settings.lang).player.commands.errors["leave"]
		var stringjoin = lang.get(interaction.guild.settings.lang).player.commands["leave"]
		var found = false
		joinedChannnels.forEach(channel=> {found = channel.id=voiceChannel? true : false})
		found==true? (interaction.followUp({content: stringjoin,ephemeral: true}),player.voices.leave(voiceChannel)) : interaction.followUp({content: stringerr,ephemeral: true}) 
	},
};