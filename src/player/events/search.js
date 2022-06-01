const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

module.exports = {
	async execute(interaction,player,lang) {
        var link = interaction.fields.getTextInputValue('textInput')
        var settings = interaction.guild.settings
        var voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            await interaction.editReply({ content: lang.get(settings.lang).player.commands.errors["memberJoin"], ephemeral: true })
            return
        }
        try {
            await player.voices.create(voiceChannel)
            await player.play(voiceChannel, link)
            settings.plugins.playerPlugin.volume? await player.setVolume(voiceChannel, parseInt(settings.plugins.playerPlugin.volume)) : await player.setVolume(voiceChannel, 50)
            var queue = await player.queues.get(voiceChannel)
            let addedsong = queue.songs[queue.songs.length-1]
            var string = lang.get(settings.lang).player.embeds["play"]
            let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`\`${addedsong.name}\` - \`${addedsong.formattedDuration}\``);
            await interaction.editReply({ content: result, ephemeral: true })
        } catch (error) {
            console.log(error)
        }
    }
};