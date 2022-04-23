const bothandler = require("./bot/bothandler");
const playerhandler = require("./player/playerhandler");
const welcomerhandler = require("./welcomer/welcomerhandler");
const twitchhandler = require("./twitch/twitchhandler");
module.exports = {
	async execute(interaction,lang,separateCustomId) {
        switch (separateCustomId[1]) {
			case "bot":
				await bothandler.execute(interaction,separateCustomId[2],lang)
			break;
			case "welcomer":
				await welcomerhandler.execute(interaction,lang,separateCustomId[2])
			break;
			case "player":
				await playerhandler.execute(interaction,lang,separateCustomId[2],playerUser)
			break;
			case "autorole":
			break;
			case "twitch":
				await twitchhandler.execute(interaction,lang,separateCustomId[2])
			break;
		}
	}
};