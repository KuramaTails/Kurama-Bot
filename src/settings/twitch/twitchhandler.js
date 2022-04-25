const bot = require("../../../bot");
const modallayout = require("../../modal/modallayout");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,customId) {
        switch (customId) {
			case "twitch":
                var customId="modal-"+customId
                var title ='Add Streamer to notification list!'
                var label="Please enter streamer's username here"
                var placeHolder="Streamer's username here"
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
			break;
			case "SelectChannel":
				interaction.guild.settings.twitchPlugin.channelId= interaction.values[0]
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
				
				await interaction.deferUpdate()
			break;
		}
	}
};