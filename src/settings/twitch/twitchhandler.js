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
                var title ='Add Streamer to notification list!'
                var label="Please enter streamer's username here"
                var placeHolder="Streamer's username here"
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