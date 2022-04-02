module.exports = {
    name: "volume",
    command:"volume",
    desc:"Select player's volume!",
    example:"/player volume [0-100]",
    async execute(interaction,player,lang) {
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    let volume = interaction.options.getNumber("volume")
                    player.setVolume(voiceChannel, volume);
                    interaction.followUp({
                        content: lang.get(interaction.guild.lang).buttons.player.settings["volSet"]+"`" + volume + "`",
                        ephemeral: true
                    })
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
                    content: lang.get(interaction.guild.lang).commands.player.commands.error["memberJoin"],
                    ephemeral: true
                })
            }
        } catch (error) {
            console.log(error)
        }
	},
};