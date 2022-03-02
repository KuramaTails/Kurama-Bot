
const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents, Message, MessageEmbed , Permissions } = require('discord.js');
const {  token } = require('./config.json');
const prefix = "!";
const DisTube = require('distube')
const { RepeatMode } = require("distube");
const { YtDlpPlugin } = require('@distube/yt-dlp')
const ytsr = require('@distube/ytsr');
const message = require('@acegoal07/discordjs-pagination/lib/message');
dotenv.config()

const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] ], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
const player = new DisTube.DisTube(bot, {
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
			for (const file of featureFiles) {
				const feature = require(`./feature/${file}`);
				if (msgfeature== feature.name) {
					await feature.execute(msg , args);
					return
				}
				
			}
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
					
				} else {
					msg.reply(
						'You must join a voice channel first.'
					)
				}
				
			}
			if(!player.getQueue(msg)) { 
				switch (msgfeature) {
					case "loop":
						msg.reply("No songs in queue")
						break;
					case "repeat":
						msg.reply("No songs in queue")
						break;
					case "stop":
						msg.reply("No songs in queue")
					break;
					case "join":
						player.voices.join(msg.member.voice.channel)
						break;
					case "leave":
						player.voices.leave(msg.member.voice.channel)
						break;
					case "skip":
						msg.reply("No songs in queue")
					break;
					case "queue":
						msg.reply("No songs in queue")
						break;
					case "pause":
						msg.reply("No songs in queue")
						break;
					case "resume":
						msg.reply("No songs in queue")
					break;
					case "play":
					break;
					default:
						msg.reply("No commands found")
					break;
				}
			}
			else {
				switch (msgfeature) {
					case "loop":
						var mode;
						if (args[0] != null) {
							switch(player.setRepeatMode(msg, parseInt(args[0]))) {
								case RepeatMode.DISABLED:
									mode = "Off";
									break;
								case RepeatMode.SONG:
									mode = "Repeat a song";
									break;
								case RepeatMode.QUEUE:
									mode = "Repeat all queue";
									break;
							}
							msg.reply("Set repeat mode to `" + mode + "`");
							break;
						}
						else {
							msg.reply("Please provide a loop mode: DISABLED = 0, SONG = 1 , QUEUE = 2 ")
						}
					break;	
					case "repeat":
						var mode;
						if (args[0] != null) {
							switch(player.setRepeatMode(msg, parseInt(args[0]))) {
								case RepeatMode.DISABLED:
									mode = "Off";
									break;
								case RepeatMode.SONG:
									mode = "Repeat a song";
									break;
								case RepeatMode.QUEUE:
									mode = "Repeat all queue";
									break;
							}
							msg.reply("Set repeat mode to `" + mode + "`");
							break;
						}
						else {
							msg.reply("Please provide a loop mode: DISABLED = 0, SONG = 1 , QUEUE = 2 ")
						}
					break;
					case "stop":
					if (!player.queues.collection.first().stopped) {
						player.stop(msg)
						msg.reply('Stopped the music!')
					}
					else {
						msg.reply("Player is not playing any song")
					}
					break;
					case "leave":
					if (bot.voice.adapters) {
						player.voices.leave(msg)
						msg.reply('Leaved the voice channel!')
					}
					else {
						msg.reply("Player is not in this channel")
					}
					break;
					case "skip":
						if (player.queues.collection.first().playing) {
							if (player.queues.collection.first().next) {
								player.skip(msg)
								msg.reply("Song skipped")
							}
							else {
								player.voices.leave(msg)
								msg.reply('Leaved the voice channel, no more songs in queue!')
							}
						}
						else {
							msg.reply('Nothing playing right now!')
						} 
					break;
					/*case "queue":
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
						break;*/
					case "pause":
						if (!player.queues.collection.first().paused) {
							player.pause(msg)
							msg.reply("Player paused")
							
						}
						else {
							msg.reply('Player already in pause!')
						}
						break;
					case "resume":
						if (!player.queues.collection.first().playing) {
							player.resume(msg)
							msg.reply("Player resumed")
						}
						else {
							msg.reply('Player already playing!')
						}
					break;
				}
			}			
			
		}
	}
});

player.on("finish", message => message.reply("No more song in queue"));

bot.on('ready', () => {
    bot.channels.fetch('942439391647899701')
    .then(channel => {
        channel.send("Hi,I'm ready!");
    })
});


bot.login(token);