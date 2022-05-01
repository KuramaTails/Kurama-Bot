const bot = require("../../../bot")
const modallayout = require("../../modal/modallayout")

module.exports= {
    async execute(interaction,lang,customId) {
        switch (customId) {
            case "textLeaver":
                var customId=customId
                var title =lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin.modal["title"]
                var label=lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin.modal["label"]
                var placeHolder=lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin.modal["placeholder"]
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
            return
        }
    }
}