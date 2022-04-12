const chooseRole = require('../roles/chooseroles')
const helpButtons = require('../help/helpbuttons')
const pollbuttons = require('../poll/pollbuttons');
const tutorial = require('../tutorial/tutorial');
const bothandler = require("../settings/bot/bothandler");
const tickethandler = require("../ticket/tickethandler");
const welcomerhandler = require("../settings/welcomer/welcomerhandler");
const playerhandler = require('../player/playerhandler');
module.exports = {
	async execute(interaction,bot,player,pollUser,pollCounter,lang,playerUser) {
		var separateCustomId = interaction.customId.split("-")
        switch (separateCustomId[0]) {
			case "role":
				chooseRole.execute(interaction,separateCustomId[1],lang)
			break;
			case "player":
				playerhandler.execute(interaction,player,lang,separateCustomId[1],playerUser)
			break;
			case "tutorial":
				tutorial.execute(interaction,lang,separateCustomId[1])
			break;
			case "welcomer":
				welcomerhandler.execute(interaction,bot,lang,separateCustomId[1])
			break;
			case "bot":
				bothandler.execute(interaction,lang,separateCustomId[1])
			break;
			case "ticket":
				tickethandler.execute(interaction,lang,separateCustomId[1])
			break;
			case "help":
				await helpButtons.execute(interaction,lang,separateCustomId[1])
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