const { MessageEmbed } = require('discord.js');
const fs= require('fs');
module.exports = {
	async execute(interaction,helpButtons) {
		interaction.update({ embeds: [helpEmbed] ,components: [helpButtons] })
	}
};

const helpEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help : Utility Command List')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
