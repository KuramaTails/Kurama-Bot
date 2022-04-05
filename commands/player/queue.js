const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    command:"queue",
    desc:"Bot will show the songs queue!",
    example:"/player queue",
	async execute(interaction,player,lang) {       
        try {
            var voiceChannel = interaction.member.voice.channel
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    var queue = player.getQueue(voiceChannel).songs
                    var i=0
                    const queueEmbed = new MessageEmbed()
                    queueEmbed.setTitle(lang.get(interaction.guild.lang).buttons.player.embeds["queue"])
                    queue.forEach(song => {
                        if (i<25) {
                            var index = i > 0 ? i : lang.get(interaction.guild.lang).buttons.player.embeds["currentlyPlaying"];
                            queueEmbed.addFields({ name: `**${index}**.` , value:  `${song.name} -`+ lang.get(interaction.guild.lang).strings["optPlayerQueueCurrentlyPlaying"] +`\`${song.formattedDuration}\``, inline: false })
                            i=i+1
                        }
                    });
                    interaction.reply({
                        embeds:[queueEmbed],
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