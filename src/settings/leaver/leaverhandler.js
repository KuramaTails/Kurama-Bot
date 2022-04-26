const bot = require("../../../bot")
const modallayout = require("../../modal/modallayout")

module.exports= {
    async execute(interaction,lang,customId) {
        switch (customId) {
            case "textLeaver":
                var customId="modal-"+customId
                var title ='Set Leaver Text!'
                var label='Please enter leave text here'
                var placeHolder='Write a text here'
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
            return
        }
    }
}