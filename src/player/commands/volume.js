module.exports = {
    name: "volume",
    command:"volume",
    desc:"Select player's volume!",
    example:"/player volume [0-100]",
    async execute(interaction,player,lang,voiceChannel,btn) {
        var stringErr = lang.get(interaction.guild.settings.lang).player.commands.errors["queue"]
        player.getQueue(voiceChannel)? setVol(voiceChannel) : interaction.followUp({content: stringErr,ephemeral: true})  
        function setVol(voiceChannel) {
            let volume = interaction.options? interaction.options.getNumber("volume") : player.getQueue(voiceChannel).volume
            btn=undefined? "" : (btn==true? volume=volume+10 : volume=volume-10)
            player.setVolume(voiceChannel, volume);
            interaction.followUp({
                content: lang.get(interaction.guild.settings.lang).player.commands["volSet"]+"`" + volume + "`",
                ephemeral: true
            })
        }
	},
};