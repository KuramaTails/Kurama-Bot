const chooseRole = require('../roles/chooseroles')
const helpButtons = require('../help/helpbuttons')
const pollbuttons = require('../poll/pollbuttons');
const tutorial = require('../tutorial/tutorial');
const tickethandler = require("../ticket/tickethandler");
const playerhandler = require('../player/playerhandler');
const settingshandler = require('../settings/settingshandler');
const assistanthandler = require('../assistant/assistanthandler');
module.exports = {
	async execute(interaction,bot,player,pollUser,pollCounter,lang,playerUser) {
		var separateCustomId = interaction.customId.split("-")
        switch (separateCustomId[0]) {
			case "role":
				await chooseRole.execute(interaction,separateCustomId[1],lang)
			break;
			case "player":
				await playerhandler.execute(interaction,player,lang,separateCustomId[1],playerUser)
			break;
			case "tutorial":
				await tutorial.execute(interaction,lang,separateCustomId[1])
			break;
			case "settings":
				await settingshandler.execute(interaction,lang,separateCustomId)
			break;
			case "ticket":
				await tickethandler.execute(interaction,lang,separateCustomId[1])
			break;
			case "help":
				await helpButtons.execute(interaction,lang,separateCustomId[1])
			break;
			case "assistant":
				await assistanthandler.execute(interaction,lang,separateCustomId[1])
			break;
			default:
				switch (true) {
					case interaction.message.embeds[0].title.includes("**__Poll__**"):
						await interaction.deferReply( {ephemeral: true});
						await pollbuttons.execute(interaction,pollUser,pollCounter,lang)
					break;
				}
			break;
		}
	}
};