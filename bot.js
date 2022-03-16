const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents} = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const playSong = require('./player/playSong');
const finish = require('./player/finish');
const empty = require('./player/empty');
const addSong = require('./player/addSong');
const playerCommands = require('./player/playerCommands');
const roleEvents = require('./events/roleEvents');
const guildMemberEvents = require('./events/guildMemberEvents');
const guildCreate = require('./events/guildCreate')
const presenceUpdate = require('./events/presenceUpdate');
const chooseRole = require('./buttons/chooseRole')
const playerButtons = require('./buttons/playerButtons')
const helpButtons = require('./buttons/helpButtons')
const deleteCooldown = require('./events/deleteCooldown')
dotenv.config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
const { setTimeout } = require('timers/promises');
const poll = require('./commands/poll');
const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.GUILD_PRESENCES],[Intents.FLAGS.GUILD_MEMBERS] ,[Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] , [Intents.FLAGS.GUILD_MESSAGE_REACTIONS]], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
bot.commands = new Collection();
cooldownUser = new Collection();
pollUser = new Collection();
pollCounter = [0,0,0,0,0]
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
const commands = [];


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
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
	console.log(`Event loaded`); 
}

bot.on('interactionCreate', async interaction => {
	try {
		if (cooldownUser.has(interaction.user.id)) {
			await interaction.deferReply( {ephemeral: true});
			await interaction.followUp({ content: "Please wait for cooldown to end", ephemeral: true });
		} else {
			cooldownUser.set(interaction.user.id, true);
			if (interaction.isButton()) {
				var selChannel = await bot.channels.cache.get(interaction.message.channelId)
				switch (selChannel.name) {
					case "choose-role":
						chooseRole.execute(interaction,cooldownUser,selChannel)
					break;
					case "player-room":
						const countVoiceChannels = bot.voice.adapters.size
						playerButtons.execute(interaction,cooldownUser,player,selChannel,countVoiceChannels)
					break;
					default:
						switch (true) {
							case interaction.message.embeds[0].title.includes("Help"):
								helpButtons.execute(interaction,cooldownUser)
							break;
							case interaction.message.embeds[0].title.includes("**__Poll__**"):
								await interaction.deferReply( {ephemeral: true});
								if (pollUser.has(interaction.user.id)) {
									await deleteCooldown.execute(interaction,cooldownUser);
									await interaction.followUp({ content: "You have choosed already one option!", ephemeral: true });
								}
								else {
									pollUser.set(interaction.user.id, true);
									switch (interaction.customId) {
										case `Option 1`:
											pollCounter[0] = pollCounter[0]+1
										break;
										case `Option 2`:
											pollCounter[1] = pollCounter[1]+1
										break;
										case `Option 3`:
											pollCounter[2] = pollCounter[2]+1
										break;
										case `Option 4`:
											pollCounter[3] = pollCounter[3]+1
										break;
										case `Option 5`:
											pollCounter[4] = pollCounter[4]+1
										break;
									}
									await deleteCooldown.execute(interaction,cooldownUser);
									await interaction.followUp({ content: "Thank you for having participate!", ephemeral: true });
								}
							break;
						}
					break;
				}
			}
			if (interaction.isCommand()) {
				const command = bot.commands.get(interaction.commandName);
				switch (true) {
					case interaction.commandName=="poll":
						pollUser.clear(); 
						pollCounter = [0,0,0,0,0]
						await deleteCooldown.execute(interaction,cooldownUser);
						await command.execute(interaction,pollCounter);
					break;
				
					default:
						await interaction.deferReply( {ephemeral: true});
						await command.execute(interaction,cooldownUser,player);
					break;
				}
			}
		}
	} catch (error) {
		console.error(error);
		interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
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
			playerCommands.execute(msg ,msgfeature, args ,player)		
		}
	}
});
player.on('playSong', async (queue) =>{
	playSong.execute(queue,player)
	clearTimeout(timeoutID)
	timeoutID = undefined	
});
player.on('addSong', (queue) => {
	addSong.execute(queue,player)
})
player.on('finish', async (queue) => {
	timeoutID = setTimeout(() => {
		finish.execute(queue,player)
	  }, 30 * 1000)
});
player.on('error', async () => {
	console.error(e)
})
player.on('empty', (queue) => {
	timeoutID = setTimeout(() => {
		empty.execute(queue,player)
	  }, 30 * 1000)
})

bot.on('ready', async () => {
	if (!bot.application?.owner) await bot.application?.fetch();
	var guilds= await bot.guilds.fetch()
	var guildsKeys= Array.from(guilds.keys())
	var guildsnames = []
	for (let i = 0; i < guildsKeys.length; i++) {
		var guild = bot.guilds.cache.get(guilds.get(guildsKeys[i]).id)
		let commandsList = await guild.commands.fetch()
		var roles = await guild.roles.fetch()
		guildsnames.push(guilds.get(guildsKeys[i]).name)
		await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
		let moderation = commandsList.find(command => command.name === "moderation")
		let keys = Array.from( roles.keys() );
		var allPermissions = []
		for (let i = 0; i < keys.length; i++) {
			if (roles.get(keys[i]).permissions.has("ADMINISTRATOR")) {
				const permissions = [{
					id: roles.get(keys[i]).id,
						type: 'ROLE',
						permission: true,
				}];
				allPermissions.push.apply(allPermissions,permissions)
			}
			else {
				const permissions = [{
					id: roles.get(keys[i]).id,
						type: 'ROLE',
						permission: false,
				}];
				allPermissions.push.apply(allPermissions,permissions)
			}			
		}
		await moderation.permissions.add({ command: moderation.id,
            permissions: allPermissions})
				.then(console.log(`Set permissions in ${guild.name}`))
				.catch(console.error);
	}
    console.log(`Bot joined into ${guildsnames.toString()}`)
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
	if (oldMember=== null || oldMember.status == newMember.status) { return}
	try {
		await presenceUpdate.execute(oldMember)
	} catch (error) {
		console.log(error)
	}
});      

bot.on("guildMemberAdd", async (member) => {
	var add=true
	guildMemberEvents.execute(member,add)
});

bot.on("guildMemberRemove", async (member) => {
	var add=false
	guildMemberEvents.execute(member,add)
});

bot.on("guildCreate", async (guild) => {
	let commandsList = await guild.commands.fetch()
		var roles = await guild.roles.fetch()
		guildsnames.push(guilds.get(guildsKeys[i]).name)
		await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
		let moderation = commandsList.find(command => command.name === "moderation")
		let keys = Array.from( roles.keys() );
		var allPermissions = []
		for (let i = 0; i < keys.length; i++) {
			if (roles.get(keys[i]).permissions.has("ADMINISTRATOR")) {
				const permissions = [{
					id: roles.get(keys[i]).id,
						type: 'ROLE',
						permission: true,
				}];
				allPermissions.push.apply(allPermissions,permissions)
			}
			else {
				const permissions = [{
					id: roles.get(keys[i]).id,
						type: 'ROLE',
						permission: false,
				}];
				allPermissions.push.apply(allPermissions,permissions)
			}			
		}
		await moderation.permissions.add({ command: moderation.id,
            permissions: allPermissions})
				.then(console.log(`Set permissions in ${guild.name}`))
				.catch(console.error);
    console.log("Joined a new guild: " + guild.name);
	guildCreate.execute(guild)
})

bot.on("guildDelete", async (guild) => {
    console.log("Left a guild: " + guild.name);
})

bot.on("roleDelete" || "roleCreate" || "roleUpdate", async (role) => {
	roleEvents.execute(role)		
})

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);