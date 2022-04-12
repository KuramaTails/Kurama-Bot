const { SlashCommandBuilder } = require('@discordjs/builders');
const report = require('./commands/report');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
        .setDescription('Select a user to report!')
        .addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
        .addStringOption(reason =>reason.setName("reason").setDescription("Describe the reason of this report")),
	async execute(interaction,player,lang) {
        report.execute(interaction,lang)
	},
};

