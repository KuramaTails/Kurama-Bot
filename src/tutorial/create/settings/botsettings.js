const selectlang = require("./embeds/selectlang")
const pluginembeds = require("./embeds/pluginembeds")
const playerembed = require("./embeds/playerembed")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        var selCategory = await guild.channels.cache.find(c => c.name == "Kurama-Zone" && c.type == "GUILD_CATEGORY")
        guild.channels.create(`bot-settings`,  {type: 'GUILD_TEXT',parent: selCategory.id}).then(async channel => {
            await selectlang.execute(interaction,channel,lang)
            await playerembed.execute(interaction,channel,lang)
            await pluginembeds.execute(interaction,channel,lang)
        })
        console.log(`Created autorole room in ${guild.name}`)
    }
}

