const { MessageEmbed } = require('discord.js');
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Command list')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('This list contains all the commands you can use in this server')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Prefix', value: '!' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Command', value: 'Do something', inline: true },
		{ name: 'Example', value: '!ban', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


module.exports = {
	name: "help",
	ephemeral: "false",
	async execute(messageCreate, args) {
        messageCreate.reply({ embeds: [exampleEmbed] });
    }
};