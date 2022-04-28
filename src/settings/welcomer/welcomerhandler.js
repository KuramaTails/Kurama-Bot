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
                var customId="modal-"+customId
                var title ='Set Welcomer Text!'
                var label='Please enter welcomer text here'
                var placeHolder='Write a text here'
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
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