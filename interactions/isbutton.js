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

const setwelcomerchannel = require('../layout/setwelcomerchannel');
const setbotchannel = require('../layout/setbotchannel');

const settingswelcomer = require('../settings/settingswelcomer');
const settingsbot = require('../settings/settingsbot');
const deletecooldown = require('../buttons/deletecooldown');

module.exports = {
	async execute(interaction,cooldownUser,bot,player) {
        discordModals(bot);
        var selChannel = await interaction.guild.channels.resolve(interaction.channelId)
		try {
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
							await part1.execute(interaction)
							deleteCooldown.execute(interaction,cooldownUser)
						break;
						case interaction.message.embeds[0].title.includes("Serverstats"):
							if (interaction.customId== "Tutorialno") {
								deleteCooldown.execute(interaction,cooldownUser)
								await part2.execute(interaction)
								return
							}
							await createserverstats.execute(interaction)
							deleteCooldown.execute(interaction,cooldownUser)
							await part2.execute(interaction)
						break;
						case interaction.message.embeds[0].title.includes("Welcome"):
							if (interaction.customId== "Tutorialno") {
								deleteCooldown.execute(interaction,cooldownUser)
								await part3.execute(interaction)
								return
							}
							await createwelcomezone.execute(interaction)
							deleteCooldown.execute(interaction,cooldownUser)
							await part3.execute(interaction)
						break;
						case interaction.message.embeds[0].title.includes("Player"):
							if (interaction.customId== "Tutorialno") {
								deleteCooldown.execute(interaction,cooldownUser)
								part4.execute(interaction)
								return
							}
							await createplayerzone.execute(interaction)
							deleteCooldown.execute(interaction,cooldownUser)
							part4.execute(interaction)
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
								await dbdisconnect()
								await setwelcomerchannel.execute(interaction)
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
							await dbdisconnect()
							await setwelcomerchannel.execute(interaction)
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
								await dbdisconnect()
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
								await dbdisconnect()
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
							await dbdisconnect()
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
							await dbdisconnect()
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
							await dbdisconnect()
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
							await dbdisconnect()
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
							deleteCooldown.execute(interaction,cooldownUser,5)
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
							await dbdisconnect()
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
							await dbdisconnect()
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
		} finally {
			deletecooldown.execute(interaction,cooldownUser)
		}
	}
};