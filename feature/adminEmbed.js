const { MessageEmbed, Client } = require('discord.js');
const fs= require('fs');
module.exports = {
	name: "adminEmbed",
	ephemeral: "false",
	command:"adminEmbed",
	desc:"Gives you a list of all commands available",
	example:"!help",
	async execute(messageCreate) {
		messageCreate.reactions.removeAll();
		messageCreate.edit({ embeds: [adminEmbed] }).then(embedMessage => {
			embedMessage.react("⬅").emoji  
		})
	}
};

const adminEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Command list (1/2)')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please use !playerhelp for a list of all music player's commands")

const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
for (const file of featureFiles) {
	const feature = require(`../feature/${file}`);
	switch (feature.categ) {
		case "admin":
			adminEmbed.addFields(
				{ name: "Command" , value: feature.command, inline: true },
				{ name: 'Description', value: feature.desc, inline: true },
				{ name: 'Example', value: feature.example, inline: true },
				)
			break;
	}		
}