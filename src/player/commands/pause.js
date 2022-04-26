module.exports = {
    name: "pause",
    command:"pause",
    desc:'Bot will pause playing!',
    example:"/player pause",
	async execute(interaction,player,lang,voiceChannel) {
        var stringPause= lang.get(interaction.guild.settings.lang).commands.player.states["paused"]
        var stringErr = lang.get(interaction.guild.settings.lang).commands.player.states.errors["paused"]
        var stringErrQueue = lang.get(interaction.guild.settings.lang).commands.player.commands.errors["queue"]
        player.getQueue(voiceChannel)? (!player.queues.collection.first().paused? (player.pause(voiceChannel),interaction.followUp({content: stringPause,ephemeral: true})) : interaction.followUp({content: stringErr,ephemeral: true})) : interaction.followUp({content: stringErrQueue,ephemeral: true})
	},
};