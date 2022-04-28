module.exports = {
    name: "shuffle",
    command:"shuffle",
    desc:"Bot will shuffle song's queue!",
    example:"/player shuffle",
	async execute(interaction,player,lang,voiceChannel) { 
        var stringShuffle = lang.get(interaction.guild.settings.lang).player.commands["shuffle"]
        var stringErr = lang.get(interaction.guild.settings.lang).player.commands.errors["queue"]
        player.getQueue(voiceChannel)? (player.shuffle(voiceChannel),interaction.followUp({content: stringShuffle,ephemeral: true})) : interaction.followUp({content: stringErr,ephemeral: true})
	},
};