module.exports = {
    name: "previous",
    command:"previous",
    desc:'Bot will play previous song!',
    example:"/player previous",
	async execute(interaction,player,lang,voiceChannel) { 
        var stringPrevious= lang.get(interaction.guild.lang).commands.player.commands["previousSong"]
        var stringErr = lang.get(interaction.guild.lang).commands.player.commands.errors["previousSong"] 
        var stringErrQueue = lang.get(interaction.guild.lang).commands.player.commands.errors["queue"]     
        player.getQueue(voiceChannel)? (player.queues.collection.first().previousSongs.length>0? (player.previous(voiceChannel),interaction.followUp({content: stringPrevious,ephemeral: true})) : interaction.followUp({content: stringErr,ephemeral: true})) : interaction.followUp({content: stringErrQueue,ephemeral: true}) 
	},
};