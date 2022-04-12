const bot = require("../../bot")
const modallayout = require("../modal/modallayout")
const playerbuttons = require("./playerbuttons")

module.exports = {
	async execute(interaction,player,lang,customId,playerUser) {
        switch (customId) {
            case "search":
                var customId="modal-"+separateCustomId[1]
                var title ='Search your song!'
                var label="Please enter songs link or title here"
                var placeHolder="Paste link or song's title here"
                modallayout.execute(interaction,bot,customId,title,label,placeHolder)
            break;
            default:
                const countVoiceChannels = bot.client.voice.adapters.size
                playerbuttons.execute(interaction,player,countVoiceChannels,lang,customId,playerUser)
            break;
        }
    }
}