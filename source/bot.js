
const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');
const { token } = require('../config.json');



const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

dotenv.config();


bot.on('ready', () => {
    console.log(`${bot.user.tag} has logged in.`);
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nCreated at: ${interaction.user.createdAt}`);
	}
});


bot.on('message', (message) => {
    console.log(message.content);
});

bot.login(token);