const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with hi!'),
	async execute(interaction) {
		await interaction.reply(`hi`);
	},
};