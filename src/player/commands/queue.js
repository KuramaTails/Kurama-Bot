const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    command:"queue",
    desc:"Bot will show the songs queue!",
    example:"/player queue",
	async execute(interaction,player,lang,voiceChannel) {   
        var stringErr = lang.get(interaction.guild.settings.lang).commands.player.commands.errors["queue"]
        player.getQueue(voiceChannel)?  optQueue(voiceChannel) : interaction.followUp({content: stringErr,ephemeral: true})
        function optQueue(voiceChannel) {
            var queue = player.getQueue(voiceChannel).songs
            var i=0
            const queueEmbed = new MessageEmbed()
            queueEmbed.setTitle(lang.get(interaction.guild.settings.lang).buttons.player.embeds["queue"])
            queue.forEach(song => {
                if (i<25) {
                    var index = i > 0 ? i : lang.get(interaction.guild.settings.lang).buttons.player.embeds["currentlyPlaying"];
                    queueEmbed.addFields({ name: `**${index}**.` , value:  `${song.name} - \`${song.formattedDuration}\``, inline: false })
                    i=i+1
                }
            });
            interaction.followUp({
                embeds:[queueEmbed],
                ephemeral: true
            })
        }
	},
};