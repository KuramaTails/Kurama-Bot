module.exports = {
    name: "play",
    command:"play",
    desc:'Bot will play a song!',
    example:"/player play <link or title>",
	async execute(interaction,player,lang,voiceChannel) {
        let link = interaction.options.getString("link")
        await player.play(voiceChannel, link)
        var queue = player.queues.get(voiceChannel)
        let addedsong = queue.songs[queue.songs.length-1]
        var string = lang.get(interaction.guild.lang).player.commands["play"]
        let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`${addedsong.name} - ${addedsong.formattedDuration}`);
        interaction.followUp({
            content: result,
            ephemeral: true
        })
	},
};