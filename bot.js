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
const roleUpdate = require('./events/roleUpdate');
const roleDelete = require('./events/roleDelete');
const roleCreate = require('./events/roleCreate');
const guildMemberRemove = require('./events/guildMemberRemove');
const guildMemberAdd = require('./events/guildMemberAdd');
const guildCreate = require('./events/guildCreate')
const presenceUpdate = require('./events/presenceUpdate');
const chooseRole = require('./buttons/chooseRole')
const playerButtons = require('./buttons/playerButtons')
const helpButtons = require('./buttons/helpButtons')
dotenv.config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.GUILD_PRESENCES],[Intents.FLAGS.GUILD_MEMBERS] ,[Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] , [Intents.FLAGS.GUILD_MESSAGE_REACTIONS]], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
bot.commands = new Collection();
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

const featureFiles = fs.readdirSync('./feature').filter(file => file.endsWith('.js'));
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
	if (interaction.isButton()) {
		try {
			var selChannel = await bot.channels.cache.get(interaction.message.channelId)
            switch (selChannel.name) {
				case "choose-role":
					chooseRole.execute(selChannel,interaction)
				break;
				case "player-room":
					const countVoiceChannels = bot.voice.adapters.size
					playerButtons.execute(interaction,player,selChannel,countVoiceChannels)
				break;
				default:
					var selMessage = await selChannel.messages.fetch(interaction.message.id)
					switch (true) {
						case selMessage.embeds[0].title.includes("Help"):
							helpButtons.execute(interaction,selMessage)
						break;
					}
				break;
			}
		}catch (error) {
			console.log(error)
		}
	}
	if (!interaction.isCommand()) return;
	const command = bot.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction,player);
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
			playerCommands.execute(msg ,msgfeature, args ,player)		
		}
	}
});
player.on('playSong', (queue) =>{
	playSong.execute(queue,player)
	clearTimeout(timeoutID)
	timeoutID = undefined	
});
player.on('addSong', (queue) => {
	addSong.execute(queue,player)
})
player.on('finish', (queue) => {
	timeoutID = setTimeout(() => {
		finish.execute(queue,player)
	  }, 30 * 1000)
});
player.on('error', () => {
	console.error(e)
})
player.on('empty', (queue) => {
	empty.execute(queue,player)
})

bot.on('ready', async () => {
	var guilds= await bot.guilds.fetch()
	var guildsKeys= Array.from(guilds.keys())
	var guildsnames = []
	for (let i = 0; i < guildsKeys.length; i++) {
		guildsnames.push(guilds.get(guildsKeys[i]).name)
		await rest.put(Routes.applicationGuildCommands(bot.user.id, guilds.get(guildsKeys[i]).id), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
	}
	
    console.log(`Bot joined into ${guildsnames.toString()}`)
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
	if (oldMember=== null || oldMember.status == newMember.status) { return}
	try {
		presenceUpdate.execute(oldMember)
	} catch (error) {
		console.log(error)
	}
});      

bot.on("guildMemberAdd", async (member) => {
	guildMemberAdd.execute(member)
});

bot.on("guildMemberRemove", async (member) => {
	guildMemberRemove.execute(member)
});

bot.on("guildCreate", async (guild) => {
    console.log("Joined a new guild: " + guild.name);
	guildCreate.execute(guild)
})

bot.on("guildDelete", async (guild) => {
    console.log("Left a guild: " + guild.name);
})

bot.on("roleCreate", async (role) => {
	roleCreate.execute(role)
})

bot.on("roleDelete", async (role) => {
	roleDelete.execute(role)		
})

bot.on("roleUpdate", async (role) => {
	roleUpdate.execute(role)
})


//bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);