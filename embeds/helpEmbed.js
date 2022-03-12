const { MessageEmbed } = require('discord.js');
const fs= require('fs');
module.exports = {
	async execute(messageCreate,helpButtons) {
		messageCreate.edit({ embeds: [helpEmbed] ,components: [helpButtons] })
	}
};

const helpEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help : Utility Command List')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })

const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
for (const file of featureFiles) {
	const feature = require(`../feature/${file}`);
	switch (feature.categ) {
		case "help":
			helpEmbed.addFields(
				{ name: "Command" , value: feature.example, inline: true },
				{ name: 'Description', value: feature.desc, inline: true },
				{ name: '\u200B', value: "\u200B", inline: true }
				)
		break;
	}		
}