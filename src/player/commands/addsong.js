module.exports = {
    name: "addsong",
    command:"Addsong",
    desc:'Bot will add a song to queue',
    example:"/player addsong <link or title>",
	async execute(interaction,player,lang,voiceChannel) {
        let link = interaction.options.getString("link")
        await player.play(voiceChannel, link)
        var queue = await player.queues.get(voiceChannel)
        let addedsong = queue.songs[queue.songs.length-1]
        var string = lang.get(interaction.guild.settings.lang).player.commands["addsong"]
        let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`${addedsong.name} - ${addedsong.formattedDuration}`);
        interaction.followUp({
            content: result,
            ephemeral: true
        })
	},
};