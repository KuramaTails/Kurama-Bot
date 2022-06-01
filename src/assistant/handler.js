const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const assistant = require("./assistant");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('assistant')
		.setDescription('Assistant will join your voice channel!'),
	
	async execute(interaction) {
		if (!interaction.member.voice.channel) return interaction.followUp('You are not in a VC')
		var textQuery = 'Hey Google?'
		await assistant.execute(interaction,textQuery)
		const embed = new MessageEmbed()
			.setColor('#a38940')
			.setDescription('Select a button here below to reply to the assistant')
		const buttons = new MessageActionRow()
		buttons.addComponents(
			new MessageButton()
			.setCustomId(`assistant-continue`)
			.setLabel(`Continue conversation`)
			.setStyle("SECONDARY"),
			new MessageButton()
			.setCustomId(`assistant-close`)
			.setLabel(`Close conversation`)
			.setStyle("DANGER"),
		);
		interaction.followUp({embeds: [embed],components: [buttons],ephemeral: true})
	},
};