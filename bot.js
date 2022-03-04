const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents, Message, MessageEmbed , Permissions, CommandInteractionOptionResolver } = require('discord.js');
const { token } = require('./config.json');
const prefix = "!";
const DisTube = require('distube')
const { RepeatMode } = require("distube");
const { YtDlpPlugin } = require('@distube/yt-dlp')
const message = require('@acegoal07/discordjs-pagination/lib/message');
dotenv.config()

const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.GUILD_PRESENCES],[Intents.FLAGS.GUILD_MEMBERS] ,[Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] ], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
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
var diffqueue


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
			if(!player.getQueue(msg)) { 
				switch (msgfeature) {
					case "wtest":
						let welcomeEmbed = new MessageEmbed()
							.setAuthor(`${msg.member.user.username} just joined!`, msg.member.user.avatarURL())
							.setDescription(`Welcome <@${msg.member.user.id}>! Don't forget to read the rules-channel! `)
							.setColor("0099ff");
							msg.reply({embeds: [welcomeEmbed]})
							.catch((err) => console.log(err));
						break;
					case "play":
						if(msg.member.voice.channel) {
							let link = args.join(" ");
								if(!link) return msg.reply("Please enter a song url or query to search");
								await player.play(msg.member.voice.channel, link)
						}
						else {
							msg.reply(
								'You must join a voice channel first.'
							)
						}
					break;
					case "addsong":
						if(msg.member.voice.channel) {
							let newlink = args.join(" ");
							if(!newlink) return msg.reply("Please enter a song url or query to search");
							await player.play(msg.member.voice.channel,newlink) 
						}
						else {
							msg.reply(
								'You must join a voice channel first.'
							)
						}
						break;
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
					default:
						msg.reply("No commands found")
					break;
				}
			}
			else {
				switch (msgfeature) {
					case "play":
						msg.reply("Please use !addsong command for adding songs in queue")
					break;
					case "addsong":
						if(msg.member.voice.channel) {
							let oldqueue = player.queues.collection.first().songs.length
							let newlink = args.join(" ");
							if(!newlink) return msg.reply("Please enter a song url or query to search");
							await player.play(msg.member.voice.channel,newlink) 
							let newqueue = player.queues.collection.first().songs.length
							diffqueue = newqueue-oldqueue;
							msg.reply("Added "+ diffqueue + " song(s) to queue")
						}
						else {
							msg.reply(
								'You must join a voice channel first.'
							)
						}
						break;
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
							if (player.queues.collection.first().songs.length>1) {
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
					case "queue":
						msg.reply(
							`Current queue:\n${player.queues.collection.first().songs
								.map((song, id) =>	`**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``)
								.slice(0, 10)
								.join('\n')}`,
						)
						break;
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
					default:
						msg.reply("No commands found")
					break;
				}
			}			
		}
	}
});
player.on('playSong', () =>{
	bot.channels.fetch('942439391647899701')
	.then(async channel => {
		let playlist = player.queues.collection.first().songs;
		const Embedsearch = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`Playing: \`${playlist[0].name}\``)
		.setThumbnail(`${playlist[0].thumbnail}`)
		.setURL(`${playlist[0].url}`)
		.setDescription(`Duration: \`${playlist[0].formattedDuration}\`\n`)
		channel.send({ embeds: [Embedsearch] });	
		clearTimeout(timeoutID)
		timeoutID = undefined	
    })
});
player.on('addSong', () => {
	bot.channels.fetch('942439391647899701')
	.then(async channel => {
		let lenght = player.queues.collection.first().songs.length
		let addedsong = player.queues.collection.first().songs[lenght-1]
		channel.send(`Added ${addedsong.name} - \`${addedsong.formattedDuration}\` to the queue`);
    })
})
player.on('finish', () => {
	bot.channels.fetch('942439391647899701')
	.then(channel => {
        timeoutID = setTimeout(() => {
			channel.send('Finish queue! Player leaved vocal channel');
			var tempvoice = bot.voice.adapters
			var tempvoiceid= Array.from(tempvoice.keys())
			player.voices.leave(tempvoiceid[0])
		}, 60*1000);
    })
});
player.on('error', () => {
	console.error(e)
})
player.on('empty', () => {
	bot.channels.fetch('942439391647899701').then(channel => {
		channel.send("The voice channel is empty! Leaving the voice channel...");
		var tempvoice = bot.voice.adapters;
		var tempvoiceid= Array.from(tempvoice.keys());
		player.voices.leave(tempvoiceid[0]);
	})
})
bot.on('ready', async () => {
	bot.channels.fetch('942439391647899701')
    .then(channel => {
        channel.send("Hi,I'm ready!");
    })
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
    var guild= await bot.guilds.cache.get("942439391647899698")
	let members = await guild.members.fetch()
	let memberskeys = Array.from(members.keys())
	let onlineMembers = []
	let offlineMembers = []
	for (let i = 0; i < memberskeys.length; i++) {
		try {
			switch (members.get(memberskeys[i]).presence.status) {
				case "online":
					onlineMembers.push(members.get(memberskeys[i]))
				break;
				case "idle":
					onlineMembers.push(members.get(memberskeys[i]))
				break;    
				case "dnd":
					onlineMembers.push(members.get(memberskeys[i]))
				break;    
				case "offline":
					offlineMembers.push(members.get(memberskeys[i]))
				break;
			}
		} catch (error) {
			offlineMembers.push(members.get(memberskeys[i]))
		}
	}
	var onlinechannel = bot.channels.cache.get('949371630537277440');
	var offlinechannel = bot.channels.cache.get('949371646257557584');
	onlinechannel.setName(`Online : ${onlineMembers.length}`);
	offlinechannel.setName(`Offline : ${offlineMembers.length}`);
});
        

bot.on("guildMemberAdd", (member) => {
	let welcomeEmbed = new MessageEmbed()
	.setTitle(`${member.user.username} just joined!`, member.user.avatarURL())
	.setDescription(`Welcome <@${member.user.id}>! Don't forget to read the rules-channel! `)
	.setColor("0099ff");
	member.guild.channels.cache.get("942439391647899701").send({embeds: [welcomeEmbed]})
	.catch((err) => console.log(err));
	var guild= bot.guilds.cache.get("942439391647899698")
	var memberchannel = bot.channels.cache.get('949362343362580500');
	var memberCount = guild.memberCount 
    memberchannel.setName(`Members : ${memberCount}`);
});
bot.on("guildMemberRemove", (member) => {
    let goodbyeEmbed = new MessageEmbed()
	.setTitle(`${member.user.username} just left!`, member.user.avatarURL())
	.setDescription(`Goodbye! 👋👋 `)
	.setColor("FF0000");
	member.guild.channels.cache.get("942439391647899701").send({embeds: [goodbyeEmbed]})
	.catch((err) => console.log(err));
	var guild= bot.guilds.cache.get("942439391647899698")
	var memberchannel = bot.channels.cache.get('949362343362580500');
	var memberCount = guild.memberCount 
    memberchannel.setName(`Members: ${memberCount}`);
});
bot.login(token);