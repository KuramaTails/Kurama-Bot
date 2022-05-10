module.exports = {
	async execute(modal,player,lang) {
        var link = modal.getTextInputValue('textinput-customid')
        var settings = modal.guild.settings
        var voiceChannel = modal.member.voice.channel
        if (!voiceChannel) {
            await modal.editReply({ content: lang.get(settings.lang).player.commands.errors["memberJoin"], ephemeral: true })
            return
        }
        try {
            await player.play(voiceChannel, link)
            settings.plugins.playerPlugin.volume? await player.setVolume(voiceChannel, parseInt(settings.plugins.playerPlugin.volume)) : await player.setVolume(voiceChannel, 50)
            var queue = await player.queues.get(voiceChannel)
            let addedsong = queue.songs[queue.songs.length-1]
            var string = lang.get(settings.lang).player.embeds["play"]
            let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`\`${addedsong.name}\` - \`${addedsong.formattedDuration}\``);
            await modal.editReply({ content: result, ephemeral: true })
        } catch (error) {
            console.log(error)
        }
    }
};