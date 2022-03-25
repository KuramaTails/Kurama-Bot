const { Modal, TextInputComponent, showModal } = require('discord-modals')
const dbconnect = require("../db/dbconnect");
const dbdisconnect = require("../db/dbdisconnect");
const deleteCooldown = require('../buttons/deletecooldown')
const discordModals = require('discord-modals')

const welcomeSchema = require('../schemas/welcome-schema');
const autoroleSchema = require('../schemas/autorole-schema');

const chooseRole = require('../buttons/chooseroles')
const helpButtons = require('../buttons/helpbuttons')
const playerButtons = require('../buttons/playerbuttons')
const pollbuttons = require('../buttons/pollbuttons');

const part1 = require('../tutorial/part 1');
const createserverstats = require('../layout/createserverstats');
const part2 = require('../tutorial/part 2');
const createwelcomezone = require('../layout/createwelcomezone');
const part3 = require('../tutorial/part 3');
const createplayerzone = require('../layout/createplayerzone');
const part4 = require('../tutorial/part 4');
const part5 = require('../tutorial/part 5');
const endtutorial = require('../tutorial/endtutorial');
const tutorialparts = [part2,part3,part4,part5,0,endtutorial]
const setwelcomerchannel = require('../layout/setwelcomerchannel');
const setbotchannel = require('../layout/setbotchannel');

const settingswelcomer = require('../settings/settingswelcomer');
const settingsbot = require('../settings/settingsbot');
const deletecooldown = require('../buttons/deletecooldown');

module.exports = {
	async execute(interaction,cooldownUser,bot,player) {
		var separateCustomId = interaction.customId.split("-")
        discordModals(bot);
		try {
			switch (separateCustomId[0]) {
				case "role":
					chooseRole.execute(interaction)
				break;
				case "player":
					const countVoiceChannels = bot.voice.adapters.size
					playerButtons.execute(interaction,player,countVoiceChannels)
				break;
				case "tutorial":
					var regExp = /\(([^)]+)\)/;
					var matches = regExp.exec(interaction.message.embeds[0].title);
					if (!matches) {
						switch (separateCustomId[1]) {
							case "start":
								await part1.execute(interaction)
							break;
							case "end":
								await interaction.guild.channels.cache.find(c => c.name == "start-with-kurama").delete()
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
											await setwelcomerchannel.execute(interaction)
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
											await setbotchannel.execute(interaction)
											await settingsbot.execute(interaction)
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
											await setwelcomerchannel.execute(interaction)
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
											await setbotchannel.execute(interaction)
											await settingsbot.execute(interaction)
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
					var bulkSelected
					try {
						switch (separateCustomId[1]) {
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
								await dbdisconnect()
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
								await dbdisconnect()
							break;
							case "enableLeaver":
								bulkSelected=1
								await dbconnect()
								await welcomeSchema.findOneAndUpdate({
									_id: interaction.guild.id,
								}, {
									activeLeave:true,
								},
								{
									upsert:true,
								})
								await dbdisconnect()
							break;
							case "disableLeaver":
								bulkSelected=2
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
								await dbdisconnect()
							break;
							case "textWelcomer":
								bulkSelected=0
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
							break;
							case "textLeaver":
								bulkSelected=0
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
							break;
						}
					} finally {
						await settingswelcomer.execute(interaction,interaction.channel,bulkSelected)
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
							await dbdisconnect()
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
							await dbdisconnect()
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
		} finally {
			deletecooldown.execute(interaction,cooldownUser)
		}
	}
};