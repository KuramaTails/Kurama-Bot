const { Modal, TextInputComponent, showModal } = require('discord-modals')
const dbconnect = require("../db/dbconnect");
const dbdisconnect = require("../db/dbdisconnect");

const welcomeSchema = require('../schemas/welcome-schema');
const autoroleSchema = require('../schemas/autorole-schema');

const chooseRole = require('../buttons/chooseroles')
const helpButtons = require('../buttons/helpbuttons')
const playerButtons = require('../buttons/playerbuttons')
const pollbuttons = require('../buttons/pollbuttons');

const part1 = require('../tutorial/part 1');
const createserverstats = require('../create/createserverstats');
const part2 = require('../tutorial/part 2');
const createwelcomezone = require('../create/createwelcomezone');
const part3 = require('../tutorial/part 3');
const createplayerzone = require('../create/createplayerzone');
const part4 = require('../tutorial/part 4');
const part5 = require('../tutorial/part 5');
const endtutorial = require('../tutorial/endtutorial');
const tutorialparts = [part2,part3,part4,part5,0,endtutorial]

const createwelcomersettings = require('../create/createwelcomersettings');
const createbotsettings = require('../create/createbotsettings');

const activewelcomer = require('../update/activewelcomer');
const activeleaver = require('../update/activeleaver');
const botsettings = require('../update/botsettings');
const selectlang = require('../tutorial/selectlang');
const guildSchema = require('../schemas/guild-schema');
module.exports = {
	async execute(interaction,bot,player,pollUser,pollCounter,lang) {
		var separateCustomId = interaction.customId.split("-")
        switch (separateCustomId[0]) {
			case "role":
				chooseRole.execute(interaction,separateCustomId[1],lang)
			break;
			case "player":
				const countVoiceChannels = bot.voice.adapters.size
				playerButtons.execute(interaction,player,countVoiceChannels,lang,separateCustomId[1])
			break;
			case "tutorial":
				var regExp = /\(([^)]+)\)/;
				var matches = regExp.exec(interaction.message.embeds[0].title);
				if (!matches) {
					switch (separateCustomId[1]) {
						case "start":
							await selectlang.execute(interaction)
						break;
						case "end":
							await interaction.guild.channels.cache.find(c => c.name == "start-with-kurama").delete()
						break;
						default:
							await dbconnect()
							await guildSchema.findOneAndUpdate({
								_id: interaction.guild.id,
							}, {
								guildLang: separateCustomId[1]
							},
							{
								upsert:true,
							})
							await dbdisconnect()
							await part1.execute(interaction)
							
						break;
					}
				}
				else {
					var splitParts = matches[1].split("/")
					var part = parseInt(splitParts[0])
					try {
						switch (separateCustomId[1]) {
							case "yes":
								switch (part) {
									case 1:
										await createserverstats.execute(interaction)
									break;
									case 2:
										await createwelcomezone.execute(interaction)
									break;
									case 3:
										await createplayerzone.execute(interaction)
									break;
									case 4:
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
										await dbdisconnect()
										await createwelcomersettings.execute(interaction)
									break;
									case 6:
										await dbconnect()
											await autoroleSchema.findOneAndUpdate({
												_id: interaction.guild.id,
											}, {
												active:true,
											},
											{
												upsert:true,
											})
											await dbdisconnect()
										await createbotsettings.execute(interaction)
									break;
								}
							break;
							case "no":
								switch (part) {
									case 4:
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
										await dbdisconnect()
										await createwelcomersettings.execute(interaction)
									break;
									case 6:
										await dbconnect()
										await autoroleSchema.findOneAndUpdate({
											_id: interaction.guild.id,
										}, {
											active:false,
										},
										{
											upsert:true,
										})
										await dbdisconnect()
										await createbotsettings.execute(interaction)
									break;
								}
							break;
						}
					} finally {
						if (part<7) {
							await tutorialparts[part-1].execute(interaction)
						}
					}
				}
			break;
			case "welcomer":
				try {
					switch (separateCustomId[1]) {
						case "textWelcomer":
							var modal = new Modal()
							.setCustomId('modal-welcomer')
							.setTitle('Set Welcomer Text!')
							.addComponents([
							new TextInputComponent()
							.setCustomId('textinput-customid')
							.setLabel('Please enter welcomer text here')
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
						return;
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
						return;
					}
					await dbconnect()
					switch (separateCustomId[1]) {
						case "enableWelcomer":
							await welcomeSchema.findOneAndUpdate({
								_id: interaction.guild.id,
							}, {
								activeWelcome:true,
							},
							{
								upsert:true,
							})
							await interaction.deferUpdate()
							await activewelcomer.execute(interaction)
						break;
						case "disableWelcomer":
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
							await interaction.deferUpdate()
							await activewelcomer.execute(interaction)
						break;
						case "enableLeaver":
							await welcomeSchema.findOneAndUpdate({
								_id: interaction.guild.id,
							}, {
								activeLeave:true,
							},
							{
								upsert:true,
							})
							await interaction.deferUpdate()
							await activeleaver.execute(interaction)
						break;
						case "disableLeaver":
							await welcomeSchema.findOneAndUpdate({
								_id: interaction.guild.id,
							}, {
								activeLeave:false,
								textLeave: null,
							},
							{
								upsert:true,
							})
							await interaction.deferUpdate()
							await activeleaver.execute(interaction)
						break;
						
					}
					await dbdisconnect()
				} catch (error) {
					console.log(error)
				}
			break;
			case "bot":
				await dbconnect()
				switch (separateCustomId[1]) {
					case "enableAutorole":
						await autoroleSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							active:true,
						},
						{
							upsert:true,
						})
						await interaction.deferUpdate()
						await botsettings.execute(interaction)
					break;
					case "disableAutorole":
						await autoroleSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							active:false,
						},
						{
							upsert:true,
						})
						await interaction.deferUpdate()
						await botsettings.execute(interaction)
					break;
					default:
						await guildSchema.findOneAndUpdate({
							_id: interaction.guild.id,
						}, {
							guildLang: separateCustomId[1]
						},
						{
							upsert:true,
						})
						interaction.guild.lang = separateCustomId[1]
						interaction.reply({
							content: "Language has been set",
							ephemeral: true
						})
					break;
				}
				await dbdisconnect()
			break;
			case "help":
				await helpButtons.execute(interaction,lang,separateCustomId[1])
			break;
			default:
				switch (true) {
					case interaction.message.embeds[0].title.includes("**__Poll__**"):
						await interaction.deferReply( {ephemeral: true});
						await pollbuttons.execute(interaction,pollUser,pollCounter)
					break;
				}
			break;
		}
	}
};