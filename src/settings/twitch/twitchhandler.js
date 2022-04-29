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
                var customId="modal-"+customId
                var title =lang.get(interaction.guild.lang).plugins.twitchPlugin.modal["title"]
                var label=lang.get(interaction.guild.lang).plugins.twitchPlugin.modal["label"]
                var placeHolder=lang.get(interaction.guild.lang).plugins.twitchPlugin.modal["placeHolder"]
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
			break;
			case "SelectChannel":
				twitchPlugin.channelId= interaction.values[0]
				await dbconnect()
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