const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection} = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const discordModals = require('discord-modals')
const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
discordModals(bot);
bot.commands = new Collection();
bot.lang = new Map();
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
	commands:bot.commands,
	lang:bot.lang,
	player:player,
	cooldownUser:cooldownUser,
	cooldownPresence:cooldownPresence,
	pollUser:pollUser,
	pollCounter:pollCounter,
	playerUser:playerUser,
	timeoutID:timeoutID
}

fs.readdirSync('./src/languages').forEach(language => {
	var langName = (language.split("."))[0]
	const reqLang = require(`./src/languages/${language}`);
	bot.lang.set(langName,reqLang)
})

fs.readdirSync('./src/').forEach(folder => {
	fs.readdirSync(`./src/${folder}`).forEach(file=> {
		var command = file.endsWith(".js")? require(`./src/${folder}/${file}`) : ""
		command.data? bot.commands.set(command.data.name, command) : ""
	})
});

var events = []
fs.readdirSync('./src/events').forEach(element => {
	element.endsWith(".js")? events.push(require(`./src/events/${element}`)) : fs.readdirSync(`./src/events/${element}`).forEach(file => {events.push(require(`./src/events/${element}/${file}`))})
});
function addEvents(events) {
	events.forEach(event => {bot.on(event.name, (...args) => event.execute(...args))});
	console.log(`Events loaded`); 
}

fs.readdirSync('./src/player/events').forEach(element => {
	var event = element.endsWith(".js")? require(`./src/player/events/${element}`) : ""
	player.on(event.name, (...args) => event.execute(...args))
});

console.log(`Languages loaded`);
console.log(`Commands loaded`); 
addEvents(events)
console.log(`PlayerEvents loaded`); 

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);