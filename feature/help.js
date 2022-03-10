const { MessageEmbed } = require('discord.js');
const fs= require('fs');
module.exports = {
	name: "help",
	ephemeral: "false",
	command:"Help",
	desc:"Gives you a list of all commands available",
	categ:"help",
	example:"!help",
	async execute(messageCreate) {
		if (messageCreate.embeds.length<1) {
			messageCreate.reply({ embeds: [startEmbed] }).then(embedMessage => {
				embedMessage.react("🔑").emoji  
				embedMessage.react("ℹ").emoji  
				embedMessage.react("⚒").emoji  
			})
		}
		else {
			messageCreate.reactions.removeAll();
			messageCreate.edit({ embeds: [startEmbed] }).then(embedMessage => {
				embedMessage.react("🔑").emoji  
				embedMessage.react("ℹ").emoji  
				embedMessage.react("⚒").emoji   
		})
		}
	}
};
const startEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Command list (1/2)')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please choose one of this category")
.addFields(
	{ name: "\u200B" , value: "🔑", inline: true },
	{ name: '\u200B', value: "Admin", inline: true },
	{ name: '\u200B', value: "\u200B", inline: true }
	)
.addFields(
	{ name: "\u200B" , value: "ℹ", inline: true },
	{ name: '\u200B', value: "Miscellaneous", inline: true },
	{ name: '\u200B', value: "\u200B", inline: true }
	)
.addFields(
	{ name: "\u200B" , value: "⚒", inline: true },
	{ name: '\u200B', value: "Moderation", inline: true },
	{ name: '\u200B', value: "\u200B", inline: true }
	)
.addFields(
	{ name: "\u200B" , value: "🎵", inline: true },
	{ name: '\u200B', value: "Music Player", inline: true },
	{ name: '\u200B', value: "\u200B", inline: true }
	)
	