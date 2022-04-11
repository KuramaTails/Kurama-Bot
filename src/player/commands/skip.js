module.exports = {
    name: "skip",
    command:"skip",
    desc:'Bot will skip this song!',
    example:"/player skip",
	async execute(interaction,player,lang) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (player.queues.collection.first().songs.length>1) {
                        player.skip(voiceChannel)
                        interaction.followUp({
                            content: lang.get(interaction.guild.lang).commands.player.commands["skip"],
                            ephemeral: true
                            })
                    }
                    else {
                        player.voices.leave(voiceChannel)
                        interaction.followUp({
                            content: lang.get(interaction.guild.lang).commands.player.commands.error["queue"],
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