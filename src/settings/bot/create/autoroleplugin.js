const autoroleembeds = require("./embeds/autoroleplugin")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        var par = guild.channels.cache.find(channel => channel.name == "Kurama-Zone")
        guild.channels.create(`Autorole-plugin`,  {type: 'GUILD_TEXT',parent: par}).then(channel => autoroleembeds.execute(interaction,channel,lang))
        console.log(`Enabled autorolePlugin in ${guild.name}`)
    }
}