const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents, MessageEmbed , MessageAttachment } = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { RepeatMode } = require("distube");
const { YtDlpPlugin } = require('@distube/yt-dlp')
const Canvas = require('canvas');
const createserverstats = require("./layout/createserverstats")
const createwelcomechannel = require("./layout/createwelcomechannel")
const createplayerchannels = require("./layout/createplayerchannels");
const createbasicroles = require("./layout/createbasicroles");
const adminEmbed = require("./embeds/adminEmbed");
const helpEmbed = require("./embeds/helpEmbed");
const generalEmbed = require("./embeds/generalEmbed");
const playerEmbed = require("./embeds/playerEmbed");
const helpHome = require("./feature/help");
const playSong = require('./player/playSong');
const { finished } = require('stream');
const { ready } = require('libsodium-wrappers');
dotenv.config()

const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.GUILD_PRESENCES],[Intents.FLAGS.GUILD_MEMBERS] ,[Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] , [Intents.FLAGS.GUILD_MESSAGE_REACTIONS]], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
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
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;
	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);
	return context.font;
};

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
player.on('playSong', async (queue) =>{
	var guild= await bot.guilds.cache.get(queue.clientMember.guild.id)
	playSong.execute(guild,player)
	clearTimeout(timeoutID)
	timeoutID = undefined	
});
player.on('addSong', async (queue) => {
	var guild= await bot.guilds.cache.get(queue.clientMember.guild.id)
	addSong.execute(guild,player)
})
player.on('finish', async (queue) => {
	var guild= await bot.guilds.cache.get(queue.clientMember.guild.id)
	finish.execute(guild,player)
});
player.on('error', () => {
	console.error(e)
})
player.on('empty', async (queue) => {
	var guild= await bot.guilds.cache.get(queue.clientMember.guild.id)
	empty.execute(guild,player)
})
bot.on('ready', async () => {
	var guilds= await bot.guilds.fetch()
	var guildskeys = Array.from(guilds.keys())
	var guildsnames = []
	for (let i = 0; i < guildskeys.length; i++) {
		guildsnames.push(guilds.get(guildskeys[i]).name)
	}
    console.log(`Bot joined into ${guildsnames.toString()}`)
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
	if (oldMember=== null || oldMember.status == newMember.status) { return}
	try {
		var guild= await bot.guilds.cache.get(oldMember.guild.id)
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
		var oldOnlineMembers = onlineMembers.length
		var oldOfflineMembers = offlineMembers.lengthù
		try {
			if (oldMember.status=="online"){
				oldOnlineMembers=oldOnlineMembers+1
				oldOfflineMembers=oldOfflineMembers-1
			}
			else {
				oldOnlineMembers=oldOnlineMembers-1
				oldOfflineMembers=oldOfflineMembers+1
			}
		} catch (error) {
			console.log(error)
		}
		var memberCount = guild.memberCount
		var listchannels = await guild.channels.fetch()
		var keyschannels = Array.from(listchannels.keys())
		for (let i = 0; i < keyschannels.length; i++) {
			switch (true) {
				case listchannels.get(keyschannels[i]).name.includes("Member"):
				listchannels.get(keyschannels[i]).setName(`Member : ${memberCount}`)
				console.log(`Member : ${memberCount}`)
				break;
				case listchannels.get(keyschannels[i]).name.includes("Online"):
				listchannels.get(keyschannels[i]).setName(`Online : ${onlineMembers.length}`)
				console.log(`Online : ${onlineMembers.length}`)
				break;
				case listchannels.get(keyschannels[i]).name.includes("Offline"):
				listchannels.get(keyschannels[i]).setName(`Offline : ${offlineMembers.length}`)
				console.log(`Offline : ${offlineMembers.length}`)
				break;
			}	
		}
		console.log(`Presence updated in ${guild}`)
	} catch (error) {
		console.log(error)
	}
});      

bot.on("guildMemberAdd", async (member) => {
	var guild= await bot.guilds.cache.get(member.guild.id)
	let members = await guild.members.fetch()
	var memberskeys = Array.from(members.keys())
	var memberCount = guild.memberCount 
	const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('./welcomer/canvas.jpg');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	context.strokeStyle = '#0099ff';
	context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '28px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Welcome!', canvas.width / 2.5, canvas.height / 3.5);

	context.font = applyText(canvas, `${member.user.username}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.user.username}`, canvas.width / 2.5, canvas.height / 1.8);

	context.font = '22px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Please read #rules-channel first!', canvas.width / 2.5, canvas.height / 1.4);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
	

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);  
			
	const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
	const embed = new MessageEmbed() // Create A New Embed
                    .setColor('#36393e')
                    .setDescription(`Welcome <@${member.user.id}> . You are the ${memberCount}th member !`)
					.setImage('attachment://profile-image.png');
	
	
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
	var oldOnlineMembers = onlineMembers.length
	var oldOfflineMembers = offlineMembers.lengthù
	try {
		if (oldMember.status=="online"){
			oldOnlineMembers=oldOnlineMembers+1
			oldOfflineMembers=oldOfflineMembers-1
		}
		else {
			oldOnlineMembers=oldOnlineMembers-1
			oldOfflineMembers=oldOfflineMembers+1
		}
	} catch (error) {
		console.log(error)
	}
    var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		switch (true) {
			case listchannels.get(keyschannels[i]).name.includes("Member"):
			listchannels.get(keyschannels[i]).setName(`Member : ${memberCount}`)
			console.log(`Member : ${memberCount}`)
			break;
			case listchannels.get(keyschannels[i]).name.includes("Online"):
			listchannels.get(keyschannels[i]).setName(`Online : ${onlineMembers.length}`)
			console.log(`Online : ${onlineMembers.length}`)
			break;
			case listchannels.get(keyschannels[i]).name.includes("Offline"):
			listchannels.get(keyschannels[i]).setName(`Offline : ${offlineMembers.length}`)
			console.log(`Offline : ${offlineMembers.length}`)
			break;
			case listchannels.get(keyschannels[i]).name.includes("welcome"):
			var welcomeChannel = listchannels.get(keyschannels[i]).id
			member.guild.channels.cache.get(welcomeChannel).send({embeds: [embed],files: [attachment] });
			break;
		}	
	}
	var roles = await guild.roles.fetch()
	var keysRoles = Array.from(roles.keys())
	for (let i = 0; i < keysRoles.length; i++) {
		if (roles.get(keysRoles[i]).name == "Member") {
			var selrole = roles.get(keysRoles[i])
			member.roles.add(selrole)
		}
	}
});

bot.on("guildMemberRemove", async (member) => {
	var guild= await bot.guilds.cache.get(member.guild.id)
	let members = await guild.members.fetch()
	var memberskeys = Array.from(members.keys())
	var memberCount = guild.memberCount 
	const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('./welcomer/canvas.jpg');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	context.strokeStyle = '#0099ff';
	context.strokeRect(0, 0, canvas.width, canvas.height);


	context.font = '28px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Oh no!', canvas.width / 2.5, canvas.height / 3.5);


	context.font = applyText(canvas, `${member.user.username}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.user.username}`, canvas.width / 2.5, canvas.height / 1.8);


	context.font = '22px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Just left this discord!', canvas.width / 2.5, canvas.height / 1.4);


	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
	

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);  
			

	const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
	const embed = new MessageEmbed() // Create A New Embed
                    .setColor('#36393e')
                    .setDescription(`<@${member.user.id}> just left this discord. There are now ${memberCount} members !`)
					.setImage('attachment://profile-image.png');
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
	var oldOnlineMembers = onlineMembers.length
	var oldOfflineMembers = offlineMembers.lengthù
	try {
		if (oldMember.status=="online"){
			oldOnlineMembers=oldOnlineMembers+1
			oldOfflineMembers=oldOfflineMembers-1
		}
		else {
			oldOnlineMembers=oldOnlineMembers-1
			oldOfflineMembers=oldOfflineMembers+1
		}
	} catch (error) {
		console.log(error)
	}
    var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		switch (true) {
			case listchannels.get(keyschannels[i]).name.includes("Member"):
			listchannels.get(keyschannels[i]).setName(`Member : ${memberCount}`)
			console.log(`Member : ${memberCount}`)
			break;
			case listchannels.get(keyschannels[i]).name.includes("Online"):
			listchannels.get(keyschannels[i]).setName(`Online : ${onlineMembers.length}`)
			console.log(`Online : ${onlineMembers.length}`)
			break;
			case listchannels.get(keyschannels[i]).name.includes("Offline"):
			listchannels.get(keyschannels[i]).setName(`Offline : ${offlineMembers.length}`)
			console.log(`Offline : ${offlineMembers.length}`)
			break;
			case listchannels.get(keyschannels[i]).name.includes("welcome"):
			var welcomeChannel = listchannels.get(keyschannels[i]).id
			member.guild.channels.cache.get(welcomeChannel).send({embeds: [embed],files: [attachment] });
			break;
		}		
	}
});

bot.on('messageReactionAdd', async (reaction, user) => {
	if (user.id == bot.user.id) {return}
    var guild= await bot.guilds.cache.get(reaction.message.guildId)
	var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		if (listchannels.get(keyschannels[i]).id == reaction.message.channelId)
		{	
			switch (listchannels.get(keyschannels[i]).name) {
				case "choose-role":
					var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
						var roles = await guild.roles.fetch()
						let keys = Array.from( roles.keys() );
						const filteredkeys = []
						for (let i = 0; i < keys.length; i++) {
							if (!roles.get(keys[i]).managed ){
								if (roles.get(keys[i]).name != "@everyone"){
									filteredkeys.push(keys[i])
								}
							}
						}
						for (let i = 0; i < filteredkeys.length; i++) {
							if (!roles.get(filteredkeys[i]).managed ){
								if (roles.get(filteredkeys[i]).name != "@everyone"){
									roles.get(filteredkeys[i]).emoji = emojilist[i]
									if (roles.get(filteredkeys[i]).emoji == reaction.emoji.name)
									{	
										var selrole = guild.roles.cache.find(role => role.name === roles.get(filteredkeys[i]).name)
										var userreacted = await guild.members.fetch(user.id,true);
										userreacted.roles.add(selrole);
										await userreacted.send(`You have received ${selrole.name} role in ${guild.name}'s Discord.`)
									}
								}
							}
						}
				break;
			}
			var textchannel = listchannels.get(keyschannels[i])
			var selchannel = await listchannels.get(keyschannels[i]).messages.fetch()
			var keysMessages= Array.from( selchannel.keys() );
			for (let i = 0; i < keysMessages.length; i++) {
				if (reaction.message.id == selchannel.get(keysMessages[i]).id) {
					switch (true) {
						case selchannel.get(keysMessages[i]).embeds[0].title.includes("Help"):
							switch (reaction.emoji.name) {
								case "🔑":
									await adminEmbed.execute(selchannel.get(keysMessages[i]))
								break;
								case "ℹ":
									await helpEmbed.execute(selchannel.get(keysMessages[i]))
								break;
								case "⚒":
									await generalEmbed.execute(selchannel.get(keysMessages[i]))
								break;
								case "🎵":
									await playerEmbed.execute(selchannel.get(keysMessages[i]),1)
								break;
							}
						break;
						case selchannel.get(keysMessages[i]).embeds[0].title.includes("Admin"):
							switch (reaction.emoji.name) {
								case "⬆":
									await adminEmbed.execute(selchannel.get(keysMessages[i]),1)
								break;
								case "⬇":
									await adminEmbed.execute(selchannel.get(keysMessages[i]),2)
								break;
								case "⬅":
									await helpHome.execute(selchannel.get(keysMessages[i]))
								break;
							}
						break;
						case selchannel.get(keysMessages[i]).embeds[0].title.includes("General"):
							switch (reaction.emoji.name) {
								case "⬆":
									await generalEmbed.execute(selchannel.get(keysMessages[i]),1)
								break;
								case "⬇":
									await generalEmbed.execute(selchannel.get(keysMessages[i]),2)
								break;
								case "⬅":
									await helpHome.execute(selchannel.get(keysMessages[i]))
								break;
							}
						break;
						case selchannel.get(keysMessages[i]).embeds[0].title.includes("Utility"):
							switch (reaction.emoji.name) {
								case "⬆":
									await helpEmbed.execute(selchannel.get(keysMessages[i]),1)
								break;
								case "⬇":
									await helpEmbed.execute(selchannel.get(keysMessages[i]),2)
								break;
								case "⬅":
									await helpHome.execute(selchannel.get(keysMessages[i]))
								break;
							}
						break;
						case selchannel.get(keysMessages[i]).embeds[0].title.includes("Player"):
							switch (reaction.emoji.name) {
								case "⬆":
									await playerEmbed.execute(selchannel.get(keysMessages[i]),1)
								break;
								case "⬇":
									await playerEmbed.execute(selchannel.get(keysMessages[i]),2)
								break;
								case "⬅":
									await helpHome.execute(selchannel.get(keysMessages[i]))
								break;
							}
						break;
						case selchannel.get(keysMessages[i]).embeds[0].title.includes("Playing"):
							switch (reaction.emoji.name) {
								case "⏮":
									//no previous
								break;
								case "⏯":
									try {
										if (!player.queues.collection.first().paused) {
											player.pause(textchannel)
											textchannel.send("Player paused")	
										}
										else {
											player.resume(textchannel)
											textchannel.send("Player resumed")	
										}
									} catch (error) {
										console.log(error)
									}
								break;
								case "⏭":
									try {
										if (player.queues.collection.first().playing) {
											if (player.queues.collection.first().songs.length>1) {
												player.skip(textchannel)
												textchannel.send("Song skipped")
											}
											else {
												player.voices.leave(textchannel)
											}
										}
									} catch (error) {
										console.log(error)
									} 
								break;
								case "🔀":
									//still no shuffle
								break;
								case "🔁":
									//mode problem
								break;
								case "🔉":
									//no audio var
								break;
								case "🔊":
									//no audio var
								break;
							}
						break;
					}
				}
			}
		}
	}
});

bot.on('messageReactionRemove', async (reaction, user) => {
    var guild= await bot.guilds.cache.get(reaction.message.guildId)
	var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		if (listchannels.get(keyschannels[i]).id == reaction.message.channelId)
		{
			if (listchannels.get(keyschannels[i]).name!= "choose-role") {return}			
			var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
			var roles = await guild.roles.fetch()
			let keys = Array.from( roles.keys() );
			const filteredkeys = []
			for (let i = 0; i < keys.length; i++) {
				if (!roles.get(keys[i]).managed ){
					if (roles.get(keys[i]).name != "@everyone"){
						filteredkeys.push(keys[i])
					}
				}
			}
			for (let i = 0; i < filteredkeys.length; i++) {
				if (!roles.get(filteredkeys[i]).managed ){
					if (roles.get(filteredkeys[i]).name != "@everyone"){
						roles.get(filteredkeys[i]).emoji = emojilist[i]
						if (roles.get(filteredkeys[i]).emoji == reaction.emoji.name)
						{
							if (user.id != bot.user.id) {
								var selrole = guild.roles.cache.find(role => role.name === roles.get(filteredkeys[i]).name)
								var userreacted = await guild.members.fetch(user.id,true);
								userreacted.roles.remove(selrole);
								await userreacted.send(`You have removed ${selrole.name} role in ${guild.name}'s Discord.`)
							}
						}
					}
				}
			}
		}
	}
});

bot.on("guildCreate", async (guild) => {
    console.log("Joined a new guild: " + guild.name);
	var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		if (listchannels.get(keyschannels[i]).type== "GUILD_TEXT"){
			listchannels.get(keyschannels[i]).send("Hi! I've just joined your channel. Please check the newly created channels").then(async msg => {
				await createserverstats.execute(msg);
				await createwelcomechannel.execute(msg);
				await createplayerchannels.execute(msg);
				await createbasicroles.execute(msg);
				return })
				return
		}
	}	
})

bot.on("guildDelete", async (guild) => {
    console.log("Left a guild: " + guild.name);
})

bot.on("roleCreate", async (role) => {
	var guild = await bot.guilds.fetch(role.guild.id)
	var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		switch (listchannels.get(keyschannels[i]).name) {
			case "choose-role":
				var selchannel = listchannels.get(keyschannels[i])
				var allmessages = await selchannel.messages.fetch()
				var keysmessages = Array.from(allmessages.keys())
				for (let i = 0; i < keysmessages.length; i++) {
					if (allmessages.get(keysmessages[i]).embeds.MessageEmbed=== null) { return }
					else {
						var oldEmbed = allmessages.get(keysmessages[i]).embeds[0];
						var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
						const newEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Add Role')
						.setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
						.setDescription(`Choose a reaction for receiving a role`)
						var roles = await guild.roles.fetch()
						let keys = Array.from( roles.keys() );
						const filteredkeys = []
						for (let i = 0; i < keys.length; i++) {
							if (!roles.get(keys[i]).managed ){
								if (roles.get(keys[i]).name != "@everyone"){
									filteredkeys.push(keys[i])
								}
							}
						}
						if (filteredkeys.length<10){
							var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
						}
						else {
							return console.log("Too many roles") 
						}
						for (let i = 0; i < filteredkeys.length; i++) {
							if (!roles.get(filteredkeys[i]).managed ){
								if (roles.get(filteredkeys[i]).name != "@everyone"){
									roles.get(filteredkeys[i]).emoji = emojilist[i]
									newEmbed.addFields(
										{ name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
										{ name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
										{ name: '\u200B', value: "\u200B", inline: true })
								}
							}
						}
						await allmessages.get(keysmessages[i]).delete();
						selchannel.send({embeds: [newEmbed]}).then(embedMessage => {
							for (let i = 0; i < filteredkeys.length; i++) {
								embedMessage.react(roles.get(filteredkeys[i]).emoji);  
							}
						});
					}
				}
			break;
		}
			
	}
})

bot.on("roleDelete", async (role) => {
	var guild = await bot.guilds.fetch(role.guild.id)
	try {
		var listchannels = await guild.channels.fetch()
	} catch (error) {
		console.log(error)
	}
	if (listchannels) {
		var keyschannels = Array.from(listchannels.keys())
		for (let i = 0; i < keyschannels.length; i++) {
			switch (listchannels.get(keyschannels[i]).name) {
				case "choose-role":
					var selchannel = listchannels.get(keyschannels[i])
					var allmessages = await selchannel.messages.fetch()
					var keysmessages = Array.from(allmessages.keys())
					for (let i = 0; i < keysmessages.length; i++) {
						if (allmessages.get(keysmessages[i]).embeds.MessageEmbed=== null) { return }
						else {
							var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
							const newEmbed = new MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Add Role')
							.setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
							.setDescription(`Choose a reaction for receiving a role`)
							var roles = await guild.roles.fetch()
							let keys = Array.from( roles.keys() );
							const filteredkeys = []
							for (let i = 0; i < keys.length; i++) {
								if (!roles.get(keys[i]).managed ){
									if (roles.get(keys[i]).name != "@everyone"){
										filteredkeys.push(keys[i])
									}
								}
							}
							if (filteredkeys.length<10){
								var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
							}
							else {
								return console.log("Too many roles") 
							}
							for (let i = 0; i < filteredkeys.length; i++) {
								if (!roles.get(filteredkeys[i]).managed ){
									if (roles.get(filteredkeys[i]).name != "@everyone"){
										roles.get(filteredkeys[i]).emoji = emojilist[i]
										newEmbed.addFields(
											{ name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
											{ name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
											{ name: '\u200B', value: "\u200B", inline: true })
									}
								}
							}
							await allmessages.get(keysmessages[i]).delete();
							selchannel.send({embeds: [newEmbed]}).then(embedMessage => {
								for (let i = 0; i < filteredkeys.length; i++) {
									embedMessage.react(roles.get(filteredkeys[i]).emoji);  
								}
							});
						}
					}
				break;
			}	
		}
	}		
})

bot.on("roleUpdate", async (role) => {
	var guild = await bot.guilds.fetch(role.guild.id)
	var listchannels = await guild.channels.fetch()
	var keyschannels = Array.from(listchannels.keys())
	for (let i = 0; i < keyschannels.length; i++) {
		switch (listchannels.get(keyschannels[i]).name) {
			case "choose-role":
				var selchannel = listchannels.get(keyschannels[i])
				var allmessages = await selchannel.messages.fetch()
				var keysmessages = Array.from(allmessages.keys())
				for (let i = 0; i < keysmessages.length; i++) {
					if (allmessages.get(keysmessages[i]).embeds.MessageEmbed=== null) { return }
					else {
						var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
						const newEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Add Role')
						.setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
						.setDescription(`Choose a reaction for receiving a role`)
						var roles = await guild.roles.fetch()
						let keys = Array.from( roles.keys() );
						const filteredkeys = []
						for (let i = 0; i < keys.length; i++) {
							if (!roles.get(keys[i]).managed ){
								if (roles.get(keys[i]).name != "@everyone"){
									filteredkeys.push(keys[i])
								}
							}
						}
						if (filteredkeys.length<10){
							var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
						}
						else {
							return console.log("Too many roles") 
						}
						for (let i = 0; i < filteredkeys.length; i++) {
							if (!roles.get(filteredkeys[i]).managed ){
								if (roles.get(filteredkeys[i]).name != "@everyone"){
									roles.get(filteredkeys[i]).emoji = emojilist[i]
									newEmbed.addFields(
										{ name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
										{ name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
										{ name: '\u200B', value: "\u200B", inline: true })
								}
							}
						}
						allmessages.get(keysmessages[i]).edit({embeds: [newEmbed]});
					}
				}
			break;
		}
			
	}
})

bot.login(process.env.BOT_TOKEN);