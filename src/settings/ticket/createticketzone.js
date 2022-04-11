const createticketembed = require("./createticketembed")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        await guild.channels.create('Ticket Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
        })
        .then(cat => {
            guild.channels.create(`create-ticket`,  {type: 'GUILD_TEXT',parent: cat}).then(async (channel) => {
                await createticketembed.execute(interaction,channel,lang)
            })
        })
        console.log(`Created welcome rooms in ${guild.name}`)
    }
}
