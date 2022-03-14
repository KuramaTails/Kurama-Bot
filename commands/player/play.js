const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song!')
        .addStringOption(option =>
            option.setName("link")
            .setDescription("Link or Title of your song")
            .setRequired(true)
            ),
        
	async execute(interaction,player) {
        var voicechannel = interaction.member.voice.channel
        if(voicechannel) {
            let link = interaction.options.getString("link")
            await player.play(voicechannel, link)
            var queue = player.queues.get(voicechannel)
            let addedsong = queue.songs[queue.songs.length-1]
            interaction.followUp({
                content: `Playing ${addedsong.name} - \`${addedsong.formattedDuration}\``,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: "You must join a voice channel first.",
                ephemeral: true
            })
        }
	},
};