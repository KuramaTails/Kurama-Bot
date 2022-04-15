const bot = require("../../bot")
const modallayout = require("../modal/modallayout")
const playerbuttons = require("./playerbuttons")

module.exports = {
	async execute(interaction,player,lang,customId,playerUser) {
        var voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.reply({
                content: lang.get(interaction.guild.lang).buttons.player.commands.errors["memberJoin"],
                ephemeral: true
            })
        }
        switch (customId) {
            case "search":
                var customId="modal-"+customId
                var title ='Search your song!'
                var label="Please enter songs link or title here"
                var placeHolder="Paste link or song's title here"
                modallayout.execute(interaction,bot.client,customId,title,label,placeHolder)
            break;
            default:
                playerbuttons.execute(interaction,player,lang,customId,playerUser)
            break;
        }
    }
}