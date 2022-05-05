module.exports = {
	async execute(modal,player,lang) {
        var link = modal.getTextInputValue('textinput-customid')
        var voicechannel = modal.member.voice.channel
        if (!voicechannel) {
            await modal.editReply({ content: lang.get(modal.guild.settings.lang).player.commands.errors["memberJoin"], ephemeral: true })
            return
        }
        try {
            await player.play(voicechannel, link)
            var queue = await player.queues.get(voicechannel)
            let addedsong = queue.songs[queue.songs.length-1]
            var string = lang.get(modal.guild.settings.lang).player.embeds["play"]
            let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`${addedsong.name} - ${addedsong.formattedDuration}`);
            await modal.editReply({ content: result, ephemeral: true })
        } catch (error) {
            console.log(error)
        }
    }
};