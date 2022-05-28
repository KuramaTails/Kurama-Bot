const { gAssistant } = require("../../bot")
const { SlashCommandBuilder } = require('@discordjs/builders');
const startconversation = require("./startconversation");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('assistant')
		.setDescription('All assistant commands!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('startconversation')
				.setDescription('Bot will leave your discord!')
				.addStringOption(question =>question.setName("question").setDescription("Select a question for assistant").setRequired(true))
		),
	
	async execute(interaction) {
		var textQuery = interaction.options.getString("question");
		startconversation.execute(gAssistant,interaction,textQuery)
	},
};