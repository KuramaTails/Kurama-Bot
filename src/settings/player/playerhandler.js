const playerSchema = require("../../schemas/player-schema")
const embed = require("./embeds/embed")

module.exports = {
    async execute(interaction,lang) {
        var selectedChannelId = interaction.values[0]
        await playerSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            channelId:selectedChannelId
        },
        {
            upsert:true,
        })
        await interaction.deferUpdate()
        await embed.execute(interaction,selectedChannelId,lang)
    }
}