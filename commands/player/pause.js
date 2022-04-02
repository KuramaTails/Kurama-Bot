module.exports = {
    name: "pause",
    command:"pause",
    desc:'Bot will pause playing!',
    example:"/player pause",
	async execute(interaction,player,lang) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (!player.queues.collection.first().paused) {
                        player.pause(voiceChannel)
                        interaction.followUp({
                            content: lang.get(interaction.guild.lang).commands.player.states["paused"],
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