const autorole = require("./embeds/autorole")
const adminzone = require("./embeds/adminzone")
const selectlang = require("./embeds/selectlang")
const twitchzone = require("./embeds/twitchzone")
const ticketzone = require("./embeds/ticketzone")

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        var selCategory = await guild.channels.cache.find(c => c.name == "Kurama-Zone" && c.type == "GUILD_CATEGORY")
        guild.channels.create(`bot-settings`,  {type: 'GUILD_TEXT',parent: selCategory.id}).then(async channel => {
            await selectlang.execute(interaction,channel,lang)
            await ticketzone.execute(interaction,channel,lang)
            await adminzone.execute(interaction,channel,lang)
            await autorole.execute(interaction,channel,lang)
            await twitchzone.execute(interaction,channel,lang)
        })
        console.log(`Created autorole room in ${guild.name}`)
    }
}

