const playerSchema = require("../../schemas/player-schema")
const createplayerembed = require("../../tutorial/create/createplayerembed")

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
        await createplayerembed.execute(interaction.guild,selectedChannelId,lang)
    }
}