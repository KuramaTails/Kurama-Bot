const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents} = require('discord.js');
const mongoose = require('mongoose')
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const chooseRole = require('./buttons/chooseroles')
const playerButtons = require('./buttons/playerbuttons')
const helpButtons = require('./buttons/helpbuttons')
const playSong = require('./events/playsong');
const finish = require('./events/finish');
const addSong = require('./events/addsong');
const roleEvents = require('./events/roleevents');
const guildMemberEvents = require('./events/guildmemberevent');
const guildCreate = require('./events/guildcreate')
const presenceUpdate = require('./events/presenceupdates');

const deleteCooldown = require('./events/deletecooldown')
dotenv.config()


const { setTimeout } = require('timers/promises');
const registerPermissions = require('./events/registerpermissions');
const pollbuttons = require('./buttons/pollbuttons');
const dbconnect = require('./events/dbconnect');
const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.GUILD_PRESENCES],[Intents.FLAGS.GUILD_MEMBERS] ,[Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] , [Intents.FLAGS.GUILD_MESSAGE_REACTIONS]], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
bot.commands = new Collection();
cooldownUser = new Collection();
cooldownPresence = new Collection();
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
								await pollbuttons.execute(interaction,cooldownUser,pollUser)
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
		finish.execute(queue)
	  }, 30 * 1000)
});
player.on('error', async () => {
	console.error(e)
})
player.on('empty', (queue) => {
	timeoutID = setTimeout(() => {
		finish.execute(queue)
	  }, 30 * 1000)
})

bot.on('ready', async () => {
	if (!process.env.DATABASE_TOKEN) {return console.log("Error,no db found")}
    try {
        mongoose.connect(process.env.DATABASE_TOKEN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to database`)
    } finally {
        mongoose.connection.close()
        console.log(`Disconnected from database`)
    }
	if (!bot.application?.owner) await bot.application?.fetch();
	var guilds= await bot.guilds.fetch()
	var guildsKeys= Array.from(guilds.keys())
	var botId = bot.user.id
	var guildsnames = []
	for (let i = 0; i < guildsKeys.length; i++) {
		var guild = bot.guilds.cache.get(guilds.get(guildsKeys[i]).id)
		await registerPermissions.execute(guild,botId,commands)
		guildsnames.push(guilds.get(guildsKeys[i]).name)
	}
    console.log(`Bot joined into ${guildsnames.toString()}`)
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
	if (oldMember=== null) { return}
	if(oldMember.status == newMember.status) {return}
	if (cooldownPresence.has(oldMember.guild.id)) {return}
	await presenceUpdate.execute(oldMember,cooldownPresence)
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
	var botId = bot.user.id
    console.log("Joined a new guild: " + guild.name);
	registerPermissions.execute(guild,botId,commands)
	guildCreate.execute(guild)
})

bot.on("guildDelete", async (guild) => {
    console.log("Left a guild: " + guild.name);
})

bot.on("roleCreate", async (role) => {
	await roleEvents.execute(role)	
		
})

bot.on("roleDelete", async (role) => {
	await roleEvents.execute(role)		
})

bot.on("roleUpdate", async (role) => {
	roleEvents.execute(role)		
})

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);