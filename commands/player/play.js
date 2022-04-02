module.exports = {
    name: "play",
    command:"play",
    desc:'Bot will play a song!',
    example:"/player play <link or title>",
	async execute(interaction,player,lang) {
        var voicechannel = interaction.member.voice.channel
        if(voicechannel) {
            let link = interaction.options.getString("link")
            await player.play(voicechannel, link)
            var queue = player.queues.get(voicechannel)
            let addedsong = queue.songs[queue.songs.length-1]
            var string = lang.get(interaction.guild.lang).commands.player.commands["play"]
            let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`${addedsong.name} - ${addedsong.formattedDuration}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: lang.get(interaction.guild.lang).commands.player.commands.error["memberJoin"],
                ephemeral: true
            })
        }
	},
};