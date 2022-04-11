const { MessageEmbed } = require('discord.js');
const fs= require('fs');

module.exports = {
	async execute(interaction,helpButtons,pagNumber) {
		await interaction.update({ embeds: [pages[pagNumber-1]],components: [helpButtons]  })	
	}
};


const commands = [];

const commandFiles = fs.readdirSync('./src/moderation/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`../../moderation/commands/${file}`);
	commands.push([command.name,command.desc,command.example]);
}

const adminEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help : Admin Command list 1/2')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
const adminEmbed2 = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Help : Admin Command list 2/2')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
for (let i = 0; i < commands.length; i++) {
	if (adminEmbed.fields.length<24) {
		adminEmbed.addFields(
			{ name: "Command" , value: commands[i][2], inline: true },
			{ name: 'Description', value: commands[i][1], inline: true },
			{ name: '\u200B', value: "\u200B", inline: true }
			)
	}
	else {
		adminEmbed2.addFields(
			{ name: "Command" , value: commands[i][2], inline: true },
			{ name: 'Description', value: commands[i][1], inline: true },
			{ name: '\u200B', value: "\u200B", inline: true }
			)
	}
}
const pages = [adminEmbed,adminEmbed2]