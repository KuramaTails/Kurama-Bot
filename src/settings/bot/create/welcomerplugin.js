const welcomerembed = require("./embeds/welcomerplugin")

module.exports = {
	async execute(interaction,lang,plugins) {
        var guild = interaction.guild
        var par = guild.channels.cache.find(channel => channel.name == "Kurama-Zone")
        guild.channels.create(`welcomer-plugin`,  {type: 'GUILD_TEXT',parent: par}).then(async (channel) => {welcomerembed.execute(interaction,channel,lang,plugins)})
        console.log(`Enabled welcomerPlugin in ${guild.name}`)
    }
}