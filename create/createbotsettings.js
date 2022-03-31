const createautoroleembed = require("./createautoroleembed")
const createselectlangembed = require("./createselectlangembed")

module.exports = {
	async execute(interaction) {
        var guild = interaction.guild
        var selCategory = await guild.channels.cache.find(c => c.name == "Kurama-Zone" && c.type == "GUILD_CATEGORY")
        guild.channels.create(`bot-settings`,  {type: 'GUILD_TEXT',parent: selCategory.id}).then(async channel => {
            await createautoroleembed.execute(interaction,channel)
            await createselectlangembed.execute(interaction,channel)
         })
        console.log(`Created autorole room in ${guild.name}`)
    }
}
