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
var spamList = new Map()
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
const AntiSpam = require("discord-anti-spam");
const checklive = require('./src/twitch/checklive');

const antiSpam = new AntiSpam({
  warnThreshold: 3,
  muteThreshold: 4,
  kickThreshold: 7,
  banThreshold: 7,
  maxInterval: 2000,
  warnMessage: "{@user}, Please stop spamming.",
  kickMessage: "**{user_tag}** has been kicked for spamming.",
  muteMessage: "**{user_tag}** has been muted for spamming.",
  banMessage: "**{user_tag}** has been banned for spamming.",
  maxDuplicatesWarning: 6,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  maxDuplicatesMute: 8,
  ignoredPermissions: ["ADMINISTRATOR"],
  ignoreBots: true,
  verbose: true,
  ignoredMembers: [],
  unMuteTime: 10,
  removeMessages: true,
  modLogsEnabled: false,
  modLogsChannelName: "mod-logs",
  modLogsMode: "embed",
});
const TwitchAPI = require('node-twitch').default
const twitch = new TwitchAPI({
    client_id: process.env.TWITCH_CLIENDID,
    client_secret: process.env.TWITCH_CLIENTSECRET
})
bot.isLive = []

module.exports = {
	prefix:prefix,
	client:bot,
	commands:bot.commands,
	lang:bot.lang,
	player:player,
	antiSpam:antiSpam,
	twitch:twitch,
	isLive:bot.isLive,
	spamList:spamList,
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

setInterval(async () => {
	await checklive.execute(twitch,bot.isLive)
	console.log("Notification checked")
}, 1*60*1000);

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);