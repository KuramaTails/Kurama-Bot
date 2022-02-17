const { MessageEmbed } = require('discord.js');
const fs= require('fs');
const { features } = require('process');
module.exports = {
	name: "help",
	ephemeral: "false",
	command:"Help",
	desc:"Gives you a list of all commands available",
    example:"!help",
	async execute(messageCreate, args) {
        messageCreate.reply({ embeds: [exampleEmbed] });
    }
};
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Command list')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('This list contains all the commands you can use in this server')
	const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
	for (const file of featureFiles) {
		const feature = require(`../feature/${file}`);
		exampleEmbed.addFields(
		{ name: "Command" , value: feature.command, inline: true },
		{ name: 'Description', value: feature.desc, inline: true },
		{ name: 'Example', value: feature.example, inline: true },
		)
	}
	exampleEmbed.setTimestamp()
	.setFooter({ text: "Click on the title for complete documentation", iconURL: 'https://i.imgur.com/AfFp7pu.png'  });