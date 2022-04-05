const createwelcomersettingsembed = require("../create/createwelcomersettingsembed");

module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        var selCategory = await guild.channels.cache.find(c => c.name == "Kurama-Zone" && c.type == "GUILD_CATEGORY")
        guild.channels.create(`welcomer-settings`,  {type: 'GUILD_TEXT',parent: selCategory.id}).then(async channel => {
           await createwelcomersettingsembed.execute(interaction,channel,lang)
        })
        console.log(`Created welcomer room in ${guild.name}`)
    }
}
