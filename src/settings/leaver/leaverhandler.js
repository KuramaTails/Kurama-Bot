const bot = require("../../../bot")
const modallayout = require("../../modal/modallayout")

module.exports= {
    async execute(interaction,lang,customId) {
        switch (customId) {
            case "textLeaver":
                var customId="modal-"+customId
                var title =lang.get(interaction.guild.lang).plugins.leaverPlugin.modal["title"]
                var label=lang.get(interaction.guild.lang).plugins.leaverPlugin.modal["label"]
                var placeHolder=lang.get(interaction.guild.lang).plugins.leaverPlugin.modal["placeholder"]
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
            return
        }
    }
}