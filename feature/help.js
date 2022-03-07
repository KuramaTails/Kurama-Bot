const { MessageEmbed } = require('discord.js');
const fs= require('fs');
module.exports = {
	name: "help",
	ephemeral: "false",
	command:"Help",
	desc:"Gives you a list of all commands available",
	example:"!help",
	async execute(messageCreate) {
		messageCreate.reply({ embeds: [embed1] })
                .then(embedMessage =>{
					embedMessage.react("⏩");
					setTimeout(async () => {
						var next = await embedMessage.reactions.resolve("⏩").users.fetch();
						if (next.get(messageCreate.author.id)){
							messageCreate.reply({ embeds: [embed2] })
						}
                    }, 10000);
					
				})	
	}
};
const embed1 = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Command list (1/2)')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please use !playerhelp for a list of all music player's commands")
const embed2 = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Command list (2/2)')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please use !playerhelp for a list of all music player's commands")

const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
for (const file of featureFiles) {
	const feature = require(`../feature/${file}`);
	if (embed1.fields.length<24) {
		embed1.addFields(
		{ name: "Command" , value: feature.command, inline: true },
		{ name: 'Description', value: feature.desc, inline: true },
		{ name: 'Example', value: feature.example, inline: true },
		)
		}
	else {
		if (embed2.fields.length<24) {
			embed2.addFields(
			{ name: "Command" , value: feature.command, inline: true },
			{ name: 'Description', value: feature.desc, inline: true },
			{ name: 'Example', value: feature.example, inline: true },
			)
		}
		else {
			messageCreate.reply("There was a problem. Please contact an admin")
		}

	}		
}