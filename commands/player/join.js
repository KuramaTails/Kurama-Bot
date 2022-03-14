const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Bot will join your voice channel!'),
        
	async execute(interaction,player) {
        var member = interaction.member.cache.get(interaction.user.id)
        if(member.voice.channel) {
            await player.join(member.voice.channel)
            interaction.reply({
                content: "Player joined",
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