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
                var selectedChannel = interaction.guild.channels.cache.find(channel => channel.id == interaction.values[0])
                if (!selectedChannel) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= selectedChannel.name
                await interaction.message.edit({components:[updatePlaceholder]})
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
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerChannelSet"]+selectedChannel.name,
                    ephemeral: true
                })
            break;
            case "selectWelcomerBackground":
                var str = interaction.values[0].split('/');
                if (!str[str.length-1]) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= str[str.length-1]
                await interaction.message.edit({components:[updatePlaceholder]})
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
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerBackgroundSet"]+str[str.length-1],
                    ephemeral: true
                })
            break;
        }
        await dbdisconnect()
    }
}