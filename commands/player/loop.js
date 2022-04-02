module.exports = { 
    name: "loop",
    command:"loop",
    desc:'You can select loop mode!',
    example:"/player loop [0,1,2]",
	async execute(interaction,player,lang) {
        try {
            var voiceChannel = interaction.member.voice.channel
            var mode
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    switch(parseInt(interaction.options.getString("mode"))) {
                        case 0:
                            player.setRepeatMode(voiceChannel, 1)
                            mode = "DISABLED"
                            interaction.followUp({
                                content: lang.get(interaction.guild.lang).commands.player.settings["repeatMode"]+ "`" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 1:
                            player.setRepeatMode(voiceChannel, 2)
                            mode = "SONG"
                            interaction.followUp({
                                content: lang.get(interaction.guild.lang).commands.player.settings["repeatMode"] +"`" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 2:
                            player.setRepeatMode(voiceChannel, 0)
                            var mode = "QUEUE"
                            interaction.followUp({
                                content: lang.get(interaction.guild.lang).commands.player.settings["repeatMode"]+ "`" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        default:
                            interaction.followUp({
                                content: lang.get(interaction.guild.lang).commands.player.settings["repeatMode"],
                                ephemeral: true
                            })
                            break;
                    } 
                }
                else {
                    interaction.followUp({
                        content: lang.get(interaction.guild.lang).commands.player.commands.error["queue"],
                        ephemeral: true
                    })
                }
            }
            else { 
                interaction.followUp({
                    content: "You must join a voice channel first.",
                    ephemeral: true
                })
            }
        } catch (error) {
            console.log(error)
        }      
	},
};