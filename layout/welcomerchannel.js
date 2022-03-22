module.exports = {
	async execute(interaction) {
        var guild = interaction.guild
        var selCategory = await guild.channels.cache.find(c => c.name == "Kurama-Zone" && c.type == "GUILD_CATEGORY")
        guild.channels.create(`welcomer-settings`,  {type: 'GUILD_TEXT',parent: selCategory.id});
        console.log(`Created welcomer room in ${guild.name}`)
    }
}
