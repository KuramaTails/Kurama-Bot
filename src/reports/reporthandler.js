module.exports= {
    async execute(interaction,lang) {
        var fields = interaction.message.embeds[0].fields
        var selectedChannelId = interaction.values[0]
        const reportAction = require(`../moderation/commands/${selectedChannelId}`);
		try {
			reportAction.execute(interaction,lang,fields)
		} catch (error) {
			await interaction.deferUpdate()
		}
    }
}