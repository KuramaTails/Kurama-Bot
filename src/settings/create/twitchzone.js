/*const embeds = require("../../twitchzone/embeds")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        await guild.channels.create('Twitch Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
        })
        .then(cat => {
            guild.channels.create(`settings`,  {type: 'GUILD_TEXT',parent: cat}).then(async (channel) => {
                await embeds.execute(interaction,channel,lang)
            })
        })
        console.log(`Created welcome rooms in ${guild.name}`)
    }
}
*/