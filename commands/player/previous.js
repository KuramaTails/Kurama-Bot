module.exports = {
    name: "previous",
    command:"previous",
    desc:'Bot will play previous song!',
    example:"/player previous",
	async execute(interaction,player,lang) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    if (player.queues.collection.first().previousSongs.length) {
                        player.previous(voiceChannel);
                        interaction.followUp({
                            content: lang.get(interaction.guild.lang).commands.player.commands["previousSong"],
                            ephemeral: true
                        })
                    }
                    else {
                        interaction.followUp({
                            content: lang.get(interaction.guild.lang).commands.player.commands.error["previousSong"],
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