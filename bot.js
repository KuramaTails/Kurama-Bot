const dotenv = require('dotenv');
const fs= require('fs');
const { Client, Collection} = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const discordModals = require('discord-modals')
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
const setautorole = require('./layout/setbotchannel');
const settingswelcomer = require('./settings/settingswelcomer');
const settingsplayer = require('./settings/settingsplayer');
const setbotchannel = require('./layout/setbotchannel');
const autoroleSchema = require('./schemas/autorole-schema');
const settingsbot = require('./settings/settingsbot');
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
									await welcomer.execute(interaction)
									deleteCooldown.execute(interaction,cooldownUser)
									await part5.execute(interaction)
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
								await part5.execute(interaction)
							break;
							case interaction.message.embeds[0].title.includes("Autorole"):
								if (interaction.customId== "Tutorialno") {
									deleteCooldown.execute(interaction,cooldownUser)
									await dbconnect()
									await autoroleSchema.findOneAndUpdate({
										_id: interaction.guild.id,
									}, {
										active:false,
									},
									{
										upsert:true,
									})
									await dbdisconnnect()
									await setbotchannel.execute(interaction)
									await settingsbot.execute(interaction)
									await endtutorial.execute(interaction)
									return
								}
								await dbconnect()
									await autoroleSchema.findOneAndUpdate({
										_id: interaction.guild.id,
									}, {
										active:true,
									},
									{
										upsert:true,
									})
									await dbdisconnnect()
								await setbotchannel.execute(interaction)
								await settingsbot.execute(interaction)
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
								deleteCooldown.execute(interaction,cooldownUser,5)
								await settingswelcomer.execute(interaction,interaction.channel)
							break;
							case "disableWelcomer":
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeWelcome:false,
									activeLeave:false,
									channelId: null,
									background: null,
									textWelcome:null,
									textLeave: null,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser,5)
								await settingswelcomer.execute(interaction,interaction.channel)
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
								deleteCooldown.execute(interaction,cooldownUser,5)
								await settingswelcomer.execute(interaction,interaction.channel,1)
							break;
							case "disableLeaver":
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeLeave:false,
									textLeave: null,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser,5)
								await settingswelcomer.execute(interaction,interaction.channel,2)
							break;
							case "textWelcomer":
								var modal = new Modal()
									.setCustomId('modal-welcomer')
									.setTitle('Set Welcomer Text!')
									.addComponents([
									new TextInputComponent()
									.setCustomId('textinput-customid')
									.setLabel('Please enter welcome text here')
									.setStyle('SHORT') 
									.setMinLength(1)
									.setMaxLength(1024)
									.setPlaceholder('Write a text here')
									.setRequired(true) 
									]);
									showModal(modal, {
										client: bot, 
										interaction: interaction 
									  })
								deleteCooldown.execute(interaction,cooldownUser)
							break;
							case "textLeaver":
								var modal = new Modal()
									.setCustomId('modal-leaver')
									.setTitle('Set Leaver Text!')
									.addComponents([
									new TextInputComponent()
									.setCustomId('textinput-customid')
									.setLabel('Please enter leave text here')
									.setStyle('SHORT') 
									.setMinLength(1)
									.setMaxLength(1024)
									.setPlaceholder('Write a text here')
									.setRequired(true) 
									]);
									showModal(modal, {
										client: bot, 
										interaction: interaction 
									  })
								deleteCooldown.execute(interaction,cooldownUser)
							break;
						}
					break;
					case "bot-settings":
						switch (interaction.customId) {
							case "enableAutorole":
								await dbconnect()
								await autoroleSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									active:true,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser,5)
								await interaction.channel.bulkDelete(1)
								await settingsbot.execute(interaction)
							break;
							case "disableAutorole":
								await dbconnect()
								await autoroleSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									active:false,
								},
								{
									upsert:true,
								})
								await dbdisconnnect()
								deleteCooldown.execute(interaction,cooldownUser,5)
								await interaction.channel.bulkDelete(2)
								await settingsbot.execute(interaction)
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
				if(interaction.customId=="tutorialSelectPlayerChannel") {
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
					await createplayerembed.execute(interaction.guild,selectedChannelId)
					await playerchannel.execute(interaction)
					await settingsplayer.execute(interaction)
					await part6.execute(interaction)
				}
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
					await createplayerembed.execute(interaction.guild,selectedChannelId)
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
				if(interaction.customId=="selectRoleChannel") {
					var role = interaction.values[0]
					await dbconnect()
						await autoroleSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							roleId: role
						},
						{
							upsert:true,
						})
					await dbdisconnnect()
					deleteCooldown.execute(interaction,cooldownUser)
					interaction.reply({
						content: `Autorole set to role <@&${interaction.values[0]}>`,
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

bot.on('modalSubmit', async (modal) => {
	if(modal.customId === 'modal-welcomer'){
		const textWelcome = modal.getTextInputValue('textinput-customid')
		await dbconnect()
		await welcomeSchema.findOneAndUpdate({
			_id: modal.member.guild.id,
			}, {
				textWelcome
			},
			{
				upsert:true,
			})
		await dbdisconnnect()
		var channel = modal.member.guild.channels.resolve(modal.channelId)
		await settingswelcomer.execute(modal,channel)
		await modal.deferReply({ ephemeral: true })
    	await modal.followUp({ content: `Welcomer text has been set to ${textWelcome}.`, ephemeral: true })
	} 
	if(modal.customId === 'modal-leaver'){
		const textLeave = modal.getTextInputValue('textinput-customid')
		await dbconnect()
		await welcomeSchema.findOneAndUpdate({
			_id: modal.member.guild.id,
			}, {
				textLeave
			},
			{
				upsert:true,
			})
		await dbdisconnnect()
		var channel = modal.member.guild.channels.resolve(modal.channelId)
		await settingswelcomer.execute(modal,channel,2)
		await modal.deferReply({ ephemeral: true })
    	await modal.followUp({ content: `Leave text has been set to ${textLeave}.`, ephemeral: true })
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

bot.on("channelCreate", async (channel) => {
	try {
		var welcomerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "welcomer-settings")
		var playerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "player-settings")
		var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
		var playerChannelMessages = await playerSettingsChannel.messages.fetch()
		var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("Choose channel"));
		var selectPlayerEmbed = await playerChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
		var welcomerMenu = selectWelcomerEmbed.components[0]
		await welcomerMenu.components[0].addOptions([
			{
				label: `${channel.name}`,
				value: `${channel.id}`,
			},
		])
		await selectWelcomerEmbed.edit({components:[welcomerMenu]})
		var playerMenu = selectPlayerEmbed.components[0]
		await playerMenu.components[0].addOptions([
			{
				label: `${channel.name}`,
				value: `${channel.id}`,
			},
		])
		await selectPlayerEmbed.edit({components:[playerMenu]})
	} catch (error) {
		console.log(error)
	}
})

bot.on("channelDelete", async (channel) => {
	try {
		var welcomerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "welcomer-settings")
		var playerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "player-settings")
		var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
		var playerChannelMessages = await playerSettingsChannel.messages.fetch()
		var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("Choose channel"));
		var selectPlayerEmbed = await playerChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
		var welcomerMenuOptions = selectWelcomerEmbed.components[0].components[0].options
		for (let i = 0; i < welcomerMenuOptions.length; i++) {
			if (welcomerMenuOptions[i].label == channel.name) {
				selectWelcomerEmbed.components[0].components[0].spliceOptions(i,1)
			}
		}
		await selectWelcomerEmbed.edit({components:[selectWelcomerEmbed.components[0]]})
		var playerMenuOptions = selectPlayerEmbed.components[0].components[0].options
		for (let i = 0; i < playerMenuOptions.length; i++) {
			if (playerMenuOptions[i].label == channel.name) {
				selectPlayerEmbed.components[0].components[0].spliceOptions(i,1)
			}
		}
		await selectPlayerEmbed.edit({components:[selectPlayerEmbed.components[0]]})
	} catch (error) {
		console.log(error)
	}
})

bot.on("roleCreate", async (role) => {
	await roleEvents.execute(role)	

	try {
		var roleSettingsChannel = await role.guild.channels.cache.find(channel => channel.name == "bot-settings")
		var roleChannelMessages = await roleSettingsChannel.messages.fetch()
		var selectRoleEmbed = await roleChannelMessages.find(message => message.embeds[0].title.includes("Choose role"));
		var roleMenu = selectRoleEmbed.components[0]
		await roleMenu.components[0].addOptions([
			{
				label: `${role.name}`,
				value: `${role.id}`,
			},
		])
		await selectRoleEmbed.edit({components:[roleMenu]})
	} catch (error) {
		console.log(error)
	}
	
})

bot.on("roleDelete", async (role) => {
	await roleEvents.execute(role)		
	try {
		var roleSettingsChannel = await role.guild.channels.cache.find(channel => channel.name == "bot-settings")
		var roleChannelMessages = await roleSettingsChannel.messages.fetch()
		var selectRoleEmbed = await roleChannelMessages.find(message => message.embeds[0].title.includes("Choose role"));
		var roleMenuOptions = selectRoleEmbed.components[0].components[0].options
		for (let i = 0; i < roleMenuOptions.length; i++) {
			if (roleMenuOptions[i].label == role.name) {
				selectRoleEmbed.components[0].components[0].spliceOptions(i,1)
			}
		}
	await selectRoleEmbed.edit({components:[selectRoleEmbed.components[0]]})
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