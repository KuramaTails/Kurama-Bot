const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('All help commands!'),
	async execute(interaction) {
        interaction.followUp({embeds: [startEmbed],components: [helpButtons]})
	},
};

const startEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help List')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please choose one of these categories")
.addFields(
	{ name: "\u200B" , value: "🔑", inline: true },
	{ name: '\u200B', value: "Admin", inline: true },
	{ name: '\u200B', value: "\u200B", inline: true }
	)
.addFields(
	{ name: "\u200B" , value: "🎵", inline: true },
	{ name: '\u200B', value: "Music Player", inline: true },
	{ name: '\u200B', value: "\u200B", inline: true }
	)
const helpButtons = new MessageActionRow()
for (let i = 0; i < startEmbed.fields.length; i++) {
	switch (startEmbed.fields[i].value) {
		case "🔑":
			helpButtons.addComponents(
				new MessageButton()
				.setCustomId(`${startEmbed.fields[i+1].value}`)
				.setLabel(`${startEmbed.fields[i].value+startEmbed.fields[i+1].value}`)
				.setStyle("PRIMARY"),
			);
		break;
		case "🆘":
			helpButtons.addComponents(
				new MessageButton()
				.setCustomId(`${startEmbed.fields[i+1].value}`)
				.setLabel(`${startEmbed.fields[i].value+startEmbed.fields[i+1].value}`)
				.setStyle("PRIMARY"),
			);
		break;
		case "🔨":
			helpButtons.addComponents(
				new MessageButton()
				.setCustomId(`${startEmbed.fields[i+1].value}`)
				.setLabel(`${startEmbed.fields[i].value+startEmbed.fields[i+1].value}`)
				.setStyle("PRIMARY"),
			);
		break;
		case "🎵":
			helpButtons.addComponents(
				new MessageButton()
				.setCustomId(`${startEmbed.fields[i+1].value}`)
				.setLabel(`${startEmbed.fields[i].value+startEmbed.fields[i+1].value}`)
				.setStyle("PRIMARY"),
			);
		break;		
	}
}