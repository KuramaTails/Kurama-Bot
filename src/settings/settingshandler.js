const bothandler = require("./bot/bothandler");
const welcomerhandler = require("./welcomer/welcomerhandler");
const twitchhandler = require("./twitch/twitchhandler");
const autorolehandler = require("./autorole/autorolehandler");
const leaverhandler = require("./leaver/leaverhandler");
module.exports = {
	async execute(interaction,lang,separateCustomId) {
		var plugins= interaction.guild.settings.plugins
		if (!(separateCustomId[2].includes("text") || separateCustomId[2].includes("Streamer") || separateCustomId[2].includes("url"))) {
			await interaction.deferUpdate()
		}
        switch (separateCustomId[1]) {
			case "bot":
				await bothandler.execute(interaction,separateCustomId[2],lang,plugins)
			break;
			case "welcomer":
				await welcomerhandler.execute(interaction,lang,separateCustomId[2],plugins)
			break;
			case "leaver":
				await leaverhandler.execute(interaction,lang,separateCustomId[2])
			break;
			case "autorole":
				await autorolehandler.execute(interaction,lang,separateCustomId[2],plugins)
			break;
			case "twitch":
				await twitchhandler.execute(interaction,lang,separateCustomId[2],plugins)
			break;
		}
	}
};