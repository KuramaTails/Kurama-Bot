const guildSchema = require("../../schemas/guild-schema")
const botsettings = require("../../tutorial/create/settings/botsettings.js")
const playerembed = require("../../tutorial/create/settings/embeds/playerembed")
const pluginembeds = require("../../tutorial/create/settings/embeds/pluginembeds")
module.exports = {
    async execute(interaction,customId,lang,plugins) {
        var channel = interaction.guild.channels.cache.find(channel => channel.name == "bot-settings")
        var messages = await channel.messages.fetch()
        messages.forEach(message => {
            if (message.embeds[0].title.includes('Language')) return
            message.delete()
        });
        interaction.guild.settings.lang = customId
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            guildLang: customId
        },
        {
            upsert:true,
        })
        await playerembed.execute(interaction,channel,lang)
        await pluginembeds.execute(interaction,channel,lang)
        var selectedLang = interaction.message.components[0].components.find(button=> button.customId == interaction.customId).label
        interaction.followUp({
            content: "Language has been set to" + ` \`${selectedLang}\``,
            ephemeral: true
        })
    }
}
