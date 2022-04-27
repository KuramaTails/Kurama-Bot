const guildSchema = require("../../schemas/guild-schema")

module.exports = {
    async execute(interaction,customId,lang,plugins) {
        /*var main = interaction.guild.channels.cache.find(channel => channel.name == "bot-settings")
        var messages = await main.messages.fetch()
        messages.forEach(message => {
            var embed = message.embeds[0]
            var components = message.components
            lang.get(interaction.guild.settings.lang).settings.plugins.
        });*/
        interaction.guild.settings.lang = customId
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            guildLang: customId
        },
        {
            upsert:true,
        })
        var selectedLang = interaction.message.components[0].components.find(button=> button.customId == interaction.customId).label
        interaction.followUp({
            content: "Language has been set to" + ` \`${selectedLang}\``,
            ephemeral: true
        })
    }
}
