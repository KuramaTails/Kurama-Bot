const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection} = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const discordModals = require('discord-modals')
const { setTimeout } = require('timers/promises');

const isButton = require('./interactions/isButton');
const isCommand = require('./interactions/isCommand');
const isselectmenu = require('./interactions/isselectmenu');

const addSong = require('./events/addsong');
const finish = require('./events/finish');
const playSong = require('./events/playsong');

const guildCreate = require('./guild/guildcreate')
const guildMemberEvents = require('./guild/guildmemberevent');
const presenceUpdate = require('./guild/presenceupdates');
const registerPermissions = require('./guild/registerpermissions');
const roleEvents = require('./guild/roleevents');

const welcomeSchema = require('./schemas/welcome-schema');
const playerSchema = require('./schemas/player-schema');


const dbconnect = require('./db/dbconnect');
const dbdisconnect = require('./db/dbdisconnect');
const deletecooldown = require('./buttons/deletecooldown');

const updatewelcomer = require('./update/updatewelcomer');
const updateleaver = require('./update/updateleaver');
const createembedroles = require('./create/createembedroles');
const channelcreate = require('./guild/channelcreate');
const channeldelete = require('./guild/channeldelete');

const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
discordModals(bot);
bot.commands = new Collection();
cooldownUser = new Collection();
cooldownPresence = new Collection();
pollUser = new Collection();
pollCounter = [0,0,0,0,0]

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
				await isButton.execute(interaction,cooldownUser,bot,player)
			}
			if (interaction.isCommand()) {
				const command = bot.commands.get(interaction.commandName);
				await isCommand.execute(interaction,command,player,pollUser,pollCounter,cooldownUser)
			}
			if(interaction.isSelectMenu()) {
				await isselectmenu.execute(interaction,cooldownUser)
			}
		}
	} catch (error) {
		console.error(error);
		await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

bot.on('messageCreate', async msg => {
	if (msg.author.username!=bot.user.username)
	{
		if(msg.content.startsWith(prefix)){
			createembedroles.execute(msg.guild)
		}
	}
});

bot.on('modalSubmit', async (modal) => {
	try {
		if (cooldownUser.has(modal.user.id)) {
			return
		} else {
			cooldownUser.set(modal.user.id, true);
			if(modal.customId === 'modal-welcomer'){
				await updatewelcomer.execute(modal)
			} 
			if(modal.customId === 'modal-leaver'){
				await updateleaver.execute(modal)
			} 
			deletecooldown.execute(modal,cooldownUser)
		}
	} catch (error) {
		console.log(error)
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
	if (!bot.application?.owner) await bot.application?.fetch();
	var guilds= await bot.guilds.fetch()
	var guildsKeys= Array.from(guilds.keys())
	var botId = bot.user.id
	var guildsnames = []
	await dbconnect()
	for (let i = 0; i < guildsKeys.length; i++) {
		var guild = bot.guilds.cache.get(guilds.get(guildsKeys[i]).id)
		await registerPermissions.execute(guild,botId,commands)
		guildsnames.push(guilds.get(guildsKeys[i]).name)
	}
	await dbdisconnect()
    console.log(`Bot joined into ${guildsnames.toString()}`)
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
	if (oldMember=== null) { return}
	if(oldMember.status == newMember.status) {return}
	if (cooldownPresence.has(oldMember.guild.id)) {return}
	try {
		await presenceUpdate.execute(newMember,cooldownPresence)
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
	var botId = bot.user.id
    console.log("Joined a new guild: " + guild.name);
	registerPermissions.execute(guild,botId,commands)
	guildCreate.execute(guild)
})

bot.on("guildDelete", async (guild) => {
	await dbconnect()
	try {
		await guildSchema.deleteOne({ "_id" : guild.id})
		await channelsSchema.deleteOne({ "_id" : guild.id})
		await membersSchema.deleteOne({ "_id" : guild.id})
		await playerSchema.deleteOne({ "_id" : guild.id})
		await rolesSchema.deleteOne({ "_id" : guild.id})
		await welcomeSchema.deleteOne({ "_id" : guild.id})
	} catch (error) {
		console.log(error)
	}
	await dbdisconnnect()
	console.log("Left a guild: " + guild.name);
})

bot.on("channelCreate", async (channel) => {
	channelcreate.execute(channel)
})

bot.on("channelDelete", async (channel) => {
	channeldelete.execute(channel)
})

bot.on("roleCreate", async (role) => {
	if (cooldownPresence.has(role.id)) {return}
	try {
		cooldownUser.set(role.id, true);
		await roleEvents.execute(role,cooldownUser,true)	
	} catch (error) {
		console.log(error)	
	}
})

bot.on("roleDelete", async (role) => {
	if (cooldownPresence.has(role.guild.id)) {return}
	try {
		cooldownUser.set(role.id, true);
		await roleEvents.execute(role,cooldownUser,false)	
	} catch (error) {
		console.log(error)	
	}
})

bot.on("roleUpdate", async (oldRole,newRole) => {
	await roleEvents.execute(newRole)		
})

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);