const bot = require("../../../bot")
const dbconnect = require("../../db/dbconnect")
const dbdisconnect = require("../../db/dbdisconnect")
const modallayout = require("../../modal/modallayout")
const guildSchema = require("../../schemas/guild-schema")
module.exports= {
    async execute(interaction,lang,customId,plugins) {
        welcomerPlugin = plugins.welcomerPlugin
        await dbconnect()
        switch (customId) {
            case "textWelcomer":
                var customId=customId
                var title =lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["title"]
                var label=lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["label"]
                var placeholder=lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["placeholder"]
                modallayout.execute(interaction,bot.client,customId,title,label,placeholder)
            return;
            case "selectWelcomerChannel":
                welcomerPlugin.channelId = interaction.values[0]
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                    }, {
                        $set: {
                            "plugins.welcomerPlugin.channelId": interaction.values[0],
                        }
                    },
                    {
                        upsert:true,
                    })
                interaction.followUp({
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerChannelSet"],
                    ephemeral: true
                })
            break;
            case "selectWelcomerBackground":
                welcomerPlugin.background = interaction.values[0]
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                    }, {
                        $set: {
                            "plugins.welcomerPlugin.background": interaction.values[0],
                        }
                    },
                    {
                        upsert:true,
                    })
                interaction.followUp({
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerBackgroundSet"],
                    ephemeral: true
                })
            break;
        }
        await dbdisconnect()
    }
}