const { Permissions , MessageEmbed } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);

module.exports = {
	name: "playerhelp",
	ephemeral: "false",
	command:"Playerhelp",
	desc:"Gives you a list of all music player's commands available",
    example:"!playerhelp",
	async execute(messageCreate, args) {
		messageCreate.reply({ embeds: [playerEmbed] })
                .then(embedMessage =>{
					embedMessage.react("⏩");
					setTimeout(async () => {
						var next = await embedMessage.reactions.resolve("⏩").users.fetch();
						if (next.get(messageCreate.author.id)){
							messageCreate.reply({ embeds: [playerEmbed2] })
						}
                    }, 10000);
					
				})	
    }
};


var commands = [ 
	{name:"Play", desc:"Play a song", example:"!play <link>"},
	{name:"Addsong", desc:"Add a song to queue", example:"!addsong <link>"},
	{name:"Loop", desc:"Loop current song", example:"!loop <mode> \n Modes: DISABLED = 0, SONG = 1 , QUEUE = 2"},
	{name:"Repeat", desc:"Repeat current song", example:"!repeat <mode> \n Modes: DISABLED = 0, SONG = 1 , QUEUE = 2"},
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
.setTitle('Player Command list (1/2)')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please use !help for all commands")
const playerEmbed2 = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Player Command list (2/2)')
.setURL('https://discord.js.org/')
.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
.setDescription("Please use !help for all commands")
for (let i = 0; i < commands.length; i++) {
	if (playerEmbed.fields.length<24) {
		playerEmbed.addFields(
			{ name: "Command" , value: commands[i].name, inline: true },
			{ name: 'Description', value: commands[i].desc, inline: true },
			{ name: 'Example', value: commands[i].example, inline: true },
			)
	}
	else {
		playerEmbed2.addFields(
			{ name: "Command" , value: commands[i].name, inline: true },
			{ name: 'Description', value: commands[i].desc, inline: true },
			{ name: 'Example', value: commands[i].example, inline: true },
			)
	}
	
}
