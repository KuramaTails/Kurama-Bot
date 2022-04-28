module.exports = { 
    name: "loop",
    command:"loop",
    desc:'You can select loop mode!',
    example:"/player loop [0,1,2]",
	async execute(interaction,player,lang,voiceChannel) {
        var mode = interaction.options? interaction.options.getString("mode") : player.getQueue(voiceChannel).repeatMode
        var stringErr = lang.get(interaction.guild.settings.lang).player.commands.errors["queue"]
        player.getQueue(voiceChannel)? (setMode(mode)) : interaction.followUp({content: stringErr,ephemeral: true})
        function setMode(mode) {
            switch(parseInt(mode)) {
                case 0:
                    player.setRepeatMode(voiceChannel, 1)
                    mode = "DISABLED"
                    interaction.followUp({
                        content: lang.get(interaction.guild.settings.lang).player.settings["repeatMode"]+ "`" + mode + "`",
                        ephemeral: true
                    })
                    break;
                case 1:
                    player.setRepeatMode(voiceChannel, 2)
                    mode = "SONG"
                    interaction.followUp({
                        content: lang.get(interaction.guild.settings.lang).player.settings["repeatMode"] +"`" + mode + "`",
                        ephemeral: true
                    })
                    break;
                case 2:
                    player.setRepeatMode(voiceChannel, 0)
                    var mode = "QUEUE"
                    interaction.followUp({
                        content: lang.get(interaction.guild.settings.lang).player.settings["repeatMode"]+ "`" + mode + "`",
                        ephemeral: true
                    })
                    break;
                default:
                    interaction.followUp({
                        content: lang.get(interaction.guild.settings.lang).player.settings["repeatMode"],
                        ephemeral: true
                    })
                    break;
            }
        }     
	},
};