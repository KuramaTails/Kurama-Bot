const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection, Intents} = require('discord.js');
const prefix = "?";
const DisTube = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const guildcreate = require('./guild/guildcreate');

const chooseRole = require('./buttons/chooseroles')
const deleteCooldown = require('./buttons/deletecooldown')
const helpButtons = require('./buttons/helpbuttons')
const playerButtons = require('./buttons/playerbuttons')
const pollbuttons = require('./buttons/pollbuttons');

const addSong = require('./events/addsong');
const finish = require('./events/finish');
const guildCreate = require('./guild/guildcreate')
const guildMemberEvents = require('./guild/guildmemberevent');
const playSong = require('./events/playsong');
const presenceUpdate = require('./guild/presenceupdates');
const registerPermissions = require('./guild/registerpermissions');
const roleEvents = require('./guild/roleevents');

const starttutorial = require('./tutorial/part 1');
const serverstats = require('./layout/createserverstats');
const welcometutorial = require('./tutorial/part 2');
const welcomechannels = require('./layout/createwelcomezone');
const playertutorial = require('./tutorial/part 3');
const playerchannels = require('./layout/createplayerzone');
const welcomertutorial = require('./tutorial/part 4');
const welcomeSchema = require('./schemas/welcome-schema');
const part5 = require('./tutorial/part 5');
const playerSchema = require('./schemas/player-schema');
const part6 = require('./tutorial/part 6');
const endtutorial = require('./tutorial/endtutorial');


const { setTimeout } = require('timers/promises');
const dbconnect = require('./db/dbconnect');
const dbdisconnnect = require('./db/dbdisconnnect');
const welcomer = require('./layout/setwelcomerchannel');
const createplayerembed = require('./layout/createplayerembed');
const playerchannel = require('./layout/setplayerchannel');
const setautorole = require('./layout/setautorole');
const settingswelcomer = require('./buttons/settingswelcomer');
const bot = new Client({ presence: {status: 'online',afk: false,activities: [{ name: 'Thinking how to destroy Earth',type: 'PLAYING' }] },intents: [ [Intents.FLAGS.GUILD_PRESENCES],[Intents.FLAGS.GUILD_MEMBERS] ,[Intents.FLAGS.DIRECT_MESSAGES] , [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], [Intents.FLAGS.GUILDS], [Intents.FLAGS.GUILD_VOICE_STATES], [Intents.FLAGS.GUILD_MESSAGES] , [Intents.FLAGS.GUILD_MESSAGE_REACTIONS]], partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION','GUILD_MEMBER'] });


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
				var selChannel = await bot.channels.cache.get(interaction.message.channelId)
				switch (selChannel.name) {
					case "choose-role":
						chooseRole.execute(interaction,cooldownUser,selChannel)
					break;
					case "player-room":
						const countVoiceChannels = bot.voice.adapters.size
						playerButtons.execute(interaction,cooldownUser,player,selChannel,countVoiceChannels)
					break;
					case "start-with-kurama":
						switch (true) {
							case interaction.message.embeds[0].title.includes("Start"):
								await starttutorial.execute(interaction)
								deleteCooldown.execute(interaction,cooldownUser)
							break;
							case interaction.message.embeds[0].title.includes("Serverstats"):
								if (interaction.customId== "Tutorialno") {
									deleteCooldown.execute(interaction,cooldownUser)
									await welcometutorial.execute(interaction)
									return
								}
								await serverstats.execute(interaction)
								deleteCooldown.execute(interaction,cooldownUser)
								await welcometutorial.execute(interaction)
							break;
							case interaction.message.embeds[0].title.includes("Welcome"):
								if (interaction.customId== "Tutorialno") {
									deleteCooldown.execute(interaction,cooldownUser)
									await playertutorial.execute(interaction)
									return
								}
								await welcomechannels.execute(interaction)
								deleteCooldown.execute(interaction,cooldownUser)
								await playertutorial.execute(interaction)
							break;
							case interaction.message.embeds[0].title.includes("Player"):
								if (interaction.customId== "Tutorialno") {
									deleteCooldown.execute(interaction,cooldownUser)
									welcomertutorial.execute(interaction)
									return
								}
								await playerchannels.execute(interaction)
								deleteCooldown.execute(interaction,cooldownUser)
								welcomertutorial.execute(interaction)
							break;
							case interaction.message.embeds[0].title.includes("Set up welcomer"):
								if (interaction.customId== "Tutorialno") {
									await dbconnect()
									await welcomeSchema.findOneAndUpdate({
										_id: interaction.guild.id,
									}, {
										activeWelcome:false,
										activeLeave:false,
									},
									{
										upsert:true,
									})
									await dbdisconnnect()
									deleteCooldown.execute(interaction,cooldownUser)
									//await part5.execute(interaction)
									return
								}
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeWelcome:true,
									activeLeave:false,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								await welcomer.execute(interaction)
								deleteCooldown.execute(interaction,cooldownUser)
								//await part5.execute(interaction)
							break;
							case interaction.message.embeds[0].title.includes("Autorole"):
								if (interaction.customId== "Tutorialno") {
									deleteCooldown.execute(interaction,cooldownUser)
									await endtutorial.execute(interaction)
									return
								}
								await setautorole.execute(interaction)
								deleteCooldown.execute(interaction,cooldownUser)
								await endtutorial.execute(interaction)
							break;
							case interaction.message.embeds[0].title.includes("End"):
								deleteCooldown.execute(interaction,cooldownUser)
								await interaction.guild.channels.cache.find(c => c.name == "start-with-kurama").delete()
							break;
						}
					break;
					case "welcomer-settings":
						switch (interaction.customId) {
							case "enableWelcomer":
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeWelcome:true,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser)
								await settingswelcomer.execute(interaction,interaction.channel,4)
							break;
							case "disableWelcomer":
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeWelcome:false,
									activeLeave:false,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser)
								await settingswelcomer.execute(interaction,interaction.channel,4)
							break;
							case "enableLeaver":
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeLeave:true,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser)
								await settingswelcomer.execute(interaction,interaction.channel,1)
							break;
							case "disableLeaver":
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeLeave:false,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser)
								await settingswelcomer.execute(interaction,interaction.channel,1)
							break;
						}
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
			if(interaction.isSelectMenu()) {
				if(interaction.customId=="selectPlayerChannel") {
					var selectedChannelId = interaction.values[0]
					await dbconnect()
						await playerSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							channelId:selectedChannelId
						},
						{
							upsert:true,
						})
					await dbdisconnnect()
					deleteCooldown.execute(interaction,cooldownUser)
					createplayerembed.execute(interaction.guild,selectedChannelId)
					playerchannel.execute(interaction)
					await part6.execute(interaction)
				}
				if(interaction.customId=="selectWelcomerChannel") {
					var selectedChannelId = interaction.values[0]
					await dbconnect()
						await welcomeSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							channelId:selectedChannelId
						},
						{
							upsert:true,
						})
					await dbdisconnnect()
					deleteCooldown.execute(interaction,cooldownUser)
					interaction.reply({
						content: `Welcomer channel set`,
						ephemeral: true
					})
				}
				if(interaction.customId=="selectWelcomerBackground") {
					var background = interaction.values[0]
					await dbconnect()
						await welcomeSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							background
						},
						{
							upsert:true,
						})
					await dbdisconnnect()
					deleteCooldown.execute(interaction,cooldownUser)
					interaction.reply({
						content: `Welcomer background set`,
						ephemeral: true
					})
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
			guildcreate.execute(msg.guild)
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
	await presenceUpdate.execute(newMember,cooldownPresence)
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

bot.on("roleCreate", async (role) => {
	await roleEvents.execute(role)	
		
})

bot.on("roleDelete", async (role) => {
	await roleEvents.execute(role)		
})

bot.on("roleUpdate", async (oldRole,newRole) => {
	await roleEvents.execute(newRole)		
})

bot.on('debug', (...args) => console.log('debug', ...args));
bot.on('rateLimit', (...args) => console.log('rateLimit', ...args));

bot.login(process.env.BOT_TOKEN);