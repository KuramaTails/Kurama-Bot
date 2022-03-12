const { MessageEmbed } = require('discord.js');
module.exports = {
	async execute(messageCreate,pageNumber) {
		switch (pageNumber) {
			case 1:
				if (playerEmbed2.fields.length>1) {
					messageCreate.reactions.removeAll();
					messageCreate.edit({ embeds: [playerEmbed] }).then(embedMessage => {
						embedMessage.react("⬅").emoji  
						embedMessage.react("⬇").emoji 
					})
				}
				else {
					messageCreate.reactions.removeAll();
					messageCreate.edit({ embeds: [playerEmbed] }).then(embedMessage => {
						embedMessage.react("⬅").emoji  
					})
				}	
			break;
			case 2:
				messageCreate.reactions.removeAll();
				messageCreate.edit({ embeds: [playerEmbed2] }).then(embedMessage => {
					embedMessage.react("⬅").emoji  
					embedMessage.react("⬆").emoji
				})
			break;
		}
	}
};


var commands = [ 
	{name:"Play", desc:"Play a song", example:"!play <link> | or title"},
	{name:"Addsong", desc:"Add a song to queue", example:"!addsong <link> | or title"},
	{name:"Loop", desc:"Loop current song", example:"!loop <mode> \n Modes: DISABLED = 0, SONG = 1 , QUEUE = 2"},
	{name:"Stop", desc:"Stop player", example:"!stop"},
	{name:"Join", desc:"Player will join your voice channel", example:"!join"},
	{name:"Leave", desc:"Player will leave your voice channel", example:"!leave"},
	{name:"Skip", desc:"Skip current song", example:"!skip"},
	{name:"Queue", desc:"Display entire queue", example:"!queue"},
	{name:"Pause", desc:"Pause playing", example:"!pause"},
	{name:"Resume", desc:"Resume playing", example:"!resume"}
 ]


const playerEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Player Command list 1/2')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
const playerEmbed2 = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Player Command list 2/2')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
for (let i = 0; i < commands.length; i++) {
	if (playerEmbed.fields.length<24) {
		playerEmbed.addFields(
			{ name: "Command" , value: commands[i].example, inline: true },
			{ name: 'Description', value: commands[i].desc, inline: true },
			{ name: '\u200B', value: "\u200B", inline: true }
			)
	}
	else {
		playerEmbed2.addFields(
			{ name: "Command" , value: commands[i].example, inline: true },
			{ name: 'Description', value: commands[i].desc, inline: true },
			{ name: '\u200B', value: "\u200B", inline: true }
			)
	}
	
	
}