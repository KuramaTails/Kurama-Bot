module.exports = {
    name: "resume",
    command:"resume",
    desc:"Bot will resume playing!",
    example:"/player resume",
	async execute(interaction,player,lang) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (player.queues.collection.first().paused) {
                        player.resume(voiceChannel)
                        interaction.followUp({
                            content: lang.get(interaction.guild.lang).commands.player.states["resumed"],
                            ephemeral: true
                        })
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
                    content: lang.get(interaction.guild.lang).commands.player.commands.error["memberJoin"],
                    ephemeral: true
                })
            }
        } catch (error) {
            console.log(error)
        }   
	},
};