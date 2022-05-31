const { SlashCommandBuilder } = require('@discordjs/builders');
const assistant = require("./assistant");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('assistant')
		.setDescription('Assistant will join your voice channel!'),
	
	async execute(interaction) {
		var textQuery = 'Hey Google'
		assistant.execute(interaction,textQuery)
	},
};