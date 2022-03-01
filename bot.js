
const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents, Message, MessageEmbed , Permissions } = require('discord.js');
const {  token } = require('./config.json');
const prefix = "!";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const ytsr = require('@distube/ytsr');
dotenv.config()

const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] ], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
let player = new DisTube.DisTube(bot, {
	leaveOnStop: false,
	searchSongs: 1,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	youtubeDL: false,
	plugins: [
		new YtDlpPlugin()
	  ],
  } ) 
  
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
	console.log(`Command loaded`);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
	console.log(`Event loaded`); 
}

for (const file of featureFiles) {
	const feature = require(`./feature/${file}`);
	bot.commands.set(feature.name, feature);
	if (feature.once) {
		bot.once(feature.name, (...args) => feature.execute(...args));
	} else {
		bot.on(feature.name, (...args) => feature.execute(...args));
	}
	console.log(`Feature loaded`);
}

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

bot.on('messageCreate', async msg => {
	var exec=false;
	if (msg.author.username!=bot.user.username)
	{
		if(msg.content.startsWith(prefix)){
			const [msgfeature, ...args] = msg.content
			.trim()
			.substring(prefix.length)
			.split(/\s+/);
			if (msgfeature === 'play') {
				
				const voiceChannel = msg.member.voice.channel
				const link = args.join(" ");
				const search = await ytsr(link, { safeSearch: true, limit: 1 })
				const song = new DisTube.Song(search.items[0]);
				if (voiceChannel) {
					if(!link) return msg.reply("Please enter a song url or query to search");
					await player.play(voiceChannel, link)
					const Embedsearch = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`Playing: \`${song.name}\``)
					.setThumbnail(`${song.thumbnail}`)
					.setURL(`${song.url}`)
					.setDescription(`Duration: \`${song.formattedDuration}\`\nRequested by: ${msg.member}`)
					msg.reply({ embeds: [Embedsearch] });
					const serverQueue = player.getQueue(msg)
					console.log()
					setTimeout(() => {
						if (serverQueue==null) {
							player.voices.leave(voiceChannel)
							msg.reply("Player leaved : No more songs in queue")
						}
					}, song.duration+60*1000);
				} else {
					msg.reply(
						'You must join a voice channel first.',
					)
				}
				
			}
			else if (['repeat', 'loop'].includes(msgfeature)) {
				const mode = player.setRepeatMode(msg)
				msg.reply(
					`Set repeat mode to \`${mode? mode === 2? 'All Queue': 'This Song': 'Off'}\``,
				)
			}
		
			else if (msgfeature === 'stop') {
				const queue = player.getQueue(msg)
				if (!queue) {
					msg.reply('Nothing playing right now!')
				} else {
					player.stop(msg)
					msg.reply('Stopped the music!')
				} 
			}
			
			else if (msgfeature === 'join') {
				if (!msg.member.voice.channel) {
					msg.reply('You are not in a voice channel!')
				} else {
					player.voices.join(msg)
					msg.reply('Joined a voice channel!')
				} 
			}

			else if (msgfeature === 'leave') {
				player.voices.leave(msg)
				msg.reply('Leaved the voice channel!')
				} 
		
			else if (msgfeature === 'resume') {
				const queue = player.getQueue(msg)
				if (!queue) {
					msg.reply('Nothing playing right now!')
				} else {
					player.resume(msg)
					msg.reply("Player resumed")
				} 
			}
		
			else if (msgfeature === 'pause') {
				const queue = player.getQueue(msg)
				if (!queue) {
					msg.reply('Nothing playing right now!')
				} else {
					player.pause(msg)
					msg.reply("Player paused")
				} 
			}
		
			else if (msgfeature === 'skip') {
				const queue = player.getQueue(msg)
				if (!queue) {
					msg.reply('Nothing playing right now!')
				} else {
					player.skip(msg)
					msg.reply("Song skipped")
				} 
			}
		
			else if (msgfeature === 'queue') {
				const queue = player.getQueue(msg)
				if (!queue) {
					msg.reply('Nothing playing right now!')
				} else {
					msg.reply(
						`Current queue:\n${queue.songs
							.map(
								(song, id) =>
									`**${id ? id : 'Playing'}**. ${
										song.name
									} - \`${song.formattedDuration}\``,
							)
							.slice(0, 10)
							.join('\n')}`,
					)
				}
			}
			
			else {
				for (const file of featureFiles) {
					const feature = require(`./feature/${file}`);
					if (msgfeature== feature.name) {
						await feature.execute(msg , args);
						exec=true;
					}
				}
				if (exec==false){
					msg.reply("No commands found")
				}	
			}
		}
	}
});


bot.on('ready', () => {
    bot.channels.fetch('942439391647899701')
    .then(channel => {
        channel.send("Hi,I'm ready!");
    })
});


bot.login(token);