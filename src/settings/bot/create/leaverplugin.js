const leaverembed = require("./embeds/leaverplugin")

module.exports = {
	async execute(interaction,lang,plugins) {
        var guild = interaction.guild
        var par = guild.channels.cache.find(channel => channel.name == "Kurama-Zone")
        guild.channels.create(`leaver-plugin`,  {type: 'GUILD_TEXT',parent: par}).then(async (channel) => {leaverembed.execute(interaction,channel,lang,plugins)})
        console.log(`Enabled leaverPlugin in ${guild.name}`)
    }
}