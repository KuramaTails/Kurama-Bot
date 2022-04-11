const { MessageEmbed } = require('discord.js');
const fs= require('fs');

module.exports = {
	async execute(interaction,helpButtons,pagNumber) {
		switch (pagNumber) {
			case 1:
				helpButtons.components[pagNumber].setDisabled(true)
				helpButtons.components[pagNumber+1].setDisabled(false)
				interaction.update({ embeds: [pages[pagNumber-1]],components: [helpButtons]  })
				break;
			case 2:
				helpButtons.components[pagNumber-1].setDisabled(false)
				helpButtons.components[pagNumber].setDisabled(true)
				interaction.update({ embeds: [pages[pagNumber-1]],components: [helpButtons]  })
				break;
		}	
	}
};


const commands = [];


const commandFiles = fs.readdirSync('./src/player/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`../../player/commands/${file}`);
	commands.push([command.name,command.desc,command.example]);
}

const playerEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help : Player Command list 1/2')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
const playerEmbed2 = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help : Player Command list 2/2')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
for (let i = 0; i < commands.length; i++) {
	if (playerEmbed.fields.length<24) {
		playerEmbed.addFields(
			{ name: "Command" , value: commands[i][2], inline: true },
			{ name: 'Description', value: commands[i][1], inline: true },
			{ name: '\u200B', value: "\u200B", inline: true }
			)
	}
	else {
		playerEmbed2.addFields(
			{ name: "Command" , value: commands[i][2], inline: true },
			{ name: 'Description', value: commands[i][1], inline: true },
			{ name: '\u200B', value: "\u200B", inline: true }
			)
	}
}
const pages = [playerEmbed,playerEmbed2]
