const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Bot will leave your voice channel!'),
        
	async execute(interaction,player) {
        var member = interaction.member.cache.get(interaction.user.id)
        if(member.voice.channel) {
            await player.leave(member.voice.channel)
            interaction.reply({
                content: "Player leaved",
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