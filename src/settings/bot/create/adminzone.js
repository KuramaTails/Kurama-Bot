const createreportembed = require("./embeds/reportembed")
const createwarnembed = require("./embeds/warnembed")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        await guild.channels.create('Admin Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
        })
        .then(cat => {
            guild.channels.create(`reports`,  {type: 'GUILD_TEXT',parent: cat}).then(async (channel) => {
                await createreportembed.execute(interaction,channel,lang)
            })
            guild.channels.create(`log`,  {type: 'GUILD_TEXT',parent: cat})
            guild.channels.create(`warn`,  {type: 'GUILD_TEXT',parent: cat}).then(async (channel) => {
                await createwarnembed.execute(interaction,channel,lang)
            })
        })
        console.log(`Created welcome rooms in ${guild.name}`)
    }
}
