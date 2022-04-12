const chooseRole = require('../roles/chooseroles')
const helpButtons = require('../help/helpbuttons')
const playerButtons = require('../player/playerbuttons')
const pollbuttons = require('../poll/pollbuttons');
const tutorial = require('../tutorial/tutorial');
const modallayout = require('../modal/modallayout');
const bothandler = require("../settings/bot/bothandler");
const tickethandler = require("../ticket/tickethandler");
const welcomerhandler = require("../settings/welcomer/welcomerhandler");
module.exports = {
	async execute(interaction,bot,player,pollUser,pollCounter,lang,playerUser) {
		var separateCustomId = interaction.customId.split("-")
        switch (separateCustomId[0]) {
			case "role":
				chooseRole.execute(interaction,separateCustomId[1],lang)
			break;
			case "player":
				switch (separateCustomId[1]) {
					case "search":
						var customId="modal-"+separateCustomId[1]
						var title ='Search your song!'
						var label="Please enter songs link or title here"
						var placeHolder="Paste link or song's title here"
						modallayout.execute(interaction,bot,customId,title,label,placeHolder)
					break;
					default:
						const countVoiceChannels = bot.voice.adapters.size
						playerButtons.execute(interaction,player,countVoiceChannels,lang,separateCustomId[1],playerUser)
					break;
				}
				
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