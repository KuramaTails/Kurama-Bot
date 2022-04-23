const twitchembed = require("./embeds/twitchembed")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        var par = guild.channels.cache.find(channel => channel.name == "Kurama-Zone")
        guild.channels.create(`twitch-plugin`,  {type: 'GUILD_TEXT',parent: par}).then(async (channel) => {twitchembed.execute(interaction,channel,lang)})
        console.log(`Created welcome rooms in ${guild.name}`)
    }
}