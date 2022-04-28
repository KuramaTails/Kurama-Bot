module.exports = {
    name: "resume",
    command:"resume",
    desc:"Bot will resume playing!",
    example:"/player resume",
	async execute(interaction,player,lang,voiceChannel) {   
        var stringResume= lang.get(interaction.guild.settings.lang).player.commands["resumed"]
        var stringErr = lang.get(interaction.guild.settings.lang).player.commands.errors["resumed"]
        var stringErrQueue = lang.get(interaction.guild.settings.lang).player.commands.errors["queue"]
        player.getQueue(voiceChannel)? (player.queues.collection.first().paused? (player.resume(voiceChannel),interaction.followUp({content: stringResume,ephemeral: true})) : interaction.followUp({content: stringErr,ephemeral: true})) : interaction.followUp({content: stringErrQueue,ephemeral: true})
	},
};