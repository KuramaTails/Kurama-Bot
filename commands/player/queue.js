module.exports = {
	async execute(interaction,player) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    var queue = player.queues.collection.first().songs
                    const startEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Current queue')
                    for (let i = 0; i < queue.length; i++) {
                        startEmbed.addFields(
                            { name: "\u200B" , value: `${i+1}. ${queue[i].name} - \`${queue[i].formattedDuration}\``, inline: true },
                            { name: '\u200B', value: "\u200B", inline: true },
                            { name: '\u200B', value: "\u200B", inline: true }
                            )
                    }
                    startEmbed.fields[0].value = "**Playing :   **" + startEmbed.fields[0].value
                    interaction.followUp({
                        embeds: [startEmbed],
                        ephemeral: true
                    })
                }
                else {
                    interaction.followUp({
                        content: "No songs in queue.",
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