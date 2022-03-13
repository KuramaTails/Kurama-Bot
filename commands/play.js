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
        var member = await interaction.member.fetch(interaction.user.id)
        if(member.voice.channel) {
            let link = interaction.options.getString("link")
            await player.play(member.voice.channel, link)
            interaction.reply({
                content: "Playing song",
                ephemeral: true
            })
        }
        else {
            interaction.reply({
                content: "You must join a voice channel first.",
                ephemeral: true
            })
        }
	},
};