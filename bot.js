const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection} = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const discordModals = require('discord-modals')
const { setTimeout } = require('timers/promises');

const isButton = require('./interactions/isbutton');
const isCommand = require('./interactions/iscommand');
const isselectmenu = require('./interactions/isselectmenu');

const addSong = require('./player/addsong');
const finish = require('./player/finish');
const playSong = require('./player/playsong');

const guildCreate = require('./guild/guildcreate')
const guildMemberEvents = require('./guild/guildmemberevent');
const presenceUpdate = require('./guild/presenceupdates');
const registerPermissions = require('./guild/registerpermissions');
const roleEvents = require('./guild/roleevents');
const channelcreate = require('./guild/channelcreate');
const channeldelete = require('./guild/channeldelete');
const roleupdate = require('./guild/roleupdate');
const channelupdate = require('./guild/channelupdate');

const welcomeSchema = require('./schemas/welcome-schema');
const playerSchema = require('./schemas/player-schema');
const guildSchema = require('./schemas/guild-schema');
const channelsSchema = require('./schemas/channels-schema');
const membersSchema = require('./schemas/members-schema');
const rolesSchema = require('./schemas/roles-schema');

const dbconnect = require('./db/dbconnect');
const dbdisconnect = require('./db/dbdisconnect');
const deletecooldown = require('./buttons/deletecooldown');

const updatewelcomer = require('./update/updatewelcomer');
const updateleaver = require('./update/updateleaver');

const ready = require('./events/ready');
const selectlang = require('./tutorial/selectlang');

const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });
discordModals(bot);
bot.commands = new Collection();
cooldownUser = new Collection();
cooldownPresence = new Collection();
pollUser = new Collection();
var pollCounter = [0,0,0,0,0]

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
	if (cooldownUser.has(interaction.user.id)) {
		await interaction.deferReply( {ephemeral: true});
		await interaction.followUp({ content: "Please wait for cooldown to end", ephemeral: true });
		return
	}
	try {
		cooldownUser.set(interaction.user.id, true);
		if (interaction.isButton()) {
			await isButton.execute(interaction,bot,player,pollUser,pollCounter)
		}
		if (interaction.isCommand()) {
			pollUser.clear(); 
			pollCounter = [0,0,0,0,0]
			const command = bot.commands.get(interaction.commandName);
			await isCommand.execute(interaction,command,player,pollCounter)
		}
		if(interaction.isSelectMenu()) {
			await isselectmenu.execute(interaction)
		}
	} catch (error) {
		console.error(error);
		await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
	} finally {
		
		deletecooldown.execute(interaction,cooldownUser)
	}
});

bot.on('messageCreate', async msg => {
	if (msg.author.username!=bot.user.username)
	{
		if(msg.content.startsWith(prefix)){
			console.log(msg.guild.lang)
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
	await ready.execute(bot,commands)
});
bot.on("presenceUpdate", async (oldMember, newMember) => {
	if (oldMember=== null) { return}
	if(oldMember.status == newMember.status) {return}
	if (cooldownPresence.has(newMember.guild.id)) {return}
	try {
		await presenceUpdate.execute(newMember,cooldownPresence)
	} catch (error) {
		console.log(error)	
	}
});      

bot.on("guildMemberAdd", async (member) => {
	var add=true
	await guildMemberEvents.execute(member,add)
	console.log(`Member joined in ${member.guild.name}`)
});

bot.on("guildMemberRemove", async (member) => {
	var add=false
	await guildMemberEvents.execute(member,add)
	console.log(`Member leaved from ${member.guild.name}`)
});

bot.on("guildCreate", async (guild) => {
	var botId = bot.user.id
	await registerPermissions.execute(guild,botId,commands)
	await guildCreate.execute(guild)
	console.log("Joined a new guild: " + guild.name);
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
	await dbdisconnect()
	console.log("Left a guild: " + guild.name);
})

bot.on("channelCreate", async (channel) => {
	await channelcreate.execute(channel)
	console.log(`Channel created in ${channel.guild.name}`)
})

bot.on("channelDelete", async (channel) => {
	await channeldelete.execute(channel)
	console.log(`Channel deleted in ${channel.guild.name}`)
})
bot.on("channelUpdate", async (oldChannel,newChannel) => {
	if (oldChannel.name != newChannel.name) {
		channelupdate.execute(oldChannel,newChannel)
	}
})
bot.on("roleCreate", async (role) => {
	if (cooldownPresence.has(role.id)) {return}
	try {
		cooldownUser.set(role.id, true);
		await roleEvents.execute(role,cooldownUser,true)	
	} catch (error) {
		console.log(error)	
	}
	console.log(`Role created in ${role.guild.name}`)

})

bot.on("roleDelete", async (role) => {
	if (cooldownPresence.has(role.guild.id)) {return}
	try {
		cooldownUser.set(role.id, true);
		await roleEvents.execute(role,cooldownUser,false)	
	} catch (error) {
		console.log(error)	
	}
	console.log(`Role deleted in ${role.guild.name}`)

})

bot.on("roleUpdate", async (oldRole,newRole) => {
	if (oldRole.name != newRole.name) {
		roleupdate.execute(oldRole,newRole)
	}
})
bot.on("error", async (error) => {
    console.error(`Bot encountered a connection error: ${error}`);
});
bot.on('warning', console.warn);
bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);