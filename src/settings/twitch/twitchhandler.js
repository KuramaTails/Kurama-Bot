const bot = require("../../../bot");
const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const modallayout = require("../../modal/modallayout");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,customId,plugin) {
		var twitchPlugin = plugin.twitchPlugin
        switch (customId) {
			case "addStreamer":
                var title =lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalAdd["title"]
                var label=lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalAdd["label"]
                var placeholder=lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalAdd["placeholder"]
                await modallayout.execute(interaction,bot.client,customId,title,label,placeholder)
			break;
			case "deleteStreamer":
                var title =lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalDelete["title"]
                var label=lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalDelete["label"]
                var placeholder=lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalDelete["placeholder"]
                await modallayout.execute(interaction,bot.client,customId,title,label,placeholder)
			break;
			case "selectChannel":
				await dbconnect()
				twitchPlugin.channelId= interaction.values[0]
				await guildSchema.findOneAndUpdate({
					_id: interaction.guild.id,
					}, {
						$set: {
							"plugins.twitchPlugin.channelId": interaction.values[0],
						}
					},
					{
						upsert:true,
					})
				await dbdisconnect()
			break;
		}
	}
};