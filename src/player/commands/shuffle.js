module.exports = {
    name: "shuffle",
    command:"shuffle",
    desc:"Bot will shuffle song's queue!",
    example:"/player shuffle",
	async execute(interaction,player,lang) {   
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    player.shuffle(voiceChannel);
                    interaction.followUp({
                        content: lang.get(interaction.guild.lang).commands.player.commands["shuffle"],
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