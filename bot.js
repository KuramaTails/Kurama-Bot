const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection} = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const discordModals = require('discord-modals')
const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });

const lang = new Map();
discordModals(bot);
const commands = []
bot.commands = new Collection();
cooldownUser = new Collection();
cooldownPresence = new Collection();
pollUser = new Collection();
var pollCounter = [0,0,0,0,0]
playerUser = new Map();

dotenv.config()

const player = new DisTube.DisTube(bot, {
	leaveOnStop: false,
	leaveOnEmpty: true,
	searchSongs: 1,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	youtubeDL: false,
	plugins: [
		new YtDlpPlugin()
	  ],
  } ) 
let timeoutID;

module.exports = {
	prefix:prefix,
	client:bot,
	listCommands:commands,
	commands:bot.commands,
	player:player,
	lang :lang,
	cooldownUser:cooldownUser,
	cooldownPresence:cooldownPresence,
	pollUser:pollUser,
	pollCounter:pollCounter,
	playerUser:playerUser,
	timeoutID:timeoutID
}

const langFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'));
for (const file of langFiles) {
	var langName = (file.split("."))[0]
	const language = require(`./languages/${file}`);
	lang.set(langName,language)
	console.log(`Language loaded`);
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());
	console.log(`Command loaded`);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	}
	else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
	console.log(`Event loaded`); 
}

const playerFiles = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of playerFiles) {
	const event = require(`./player/${file}`);
	player.on(event.name, (...args) => event.execute(...args));
	console.log(`Player event loaded`); 
}

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);