const bot = require("../../bot")
const modallayout = require("../modal/modallayout")
const playerbuttons = require("./playerbuttons")

module.exports = {
	async execute(interaction,player,lang,customId,playerUser) {
        var voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.reply({
                content: lang.get(interaction.guild.settings.lang).player.commands.errors["memberJoin"],
                ephemeral: true
            })
        }
        switch (customId) {
            case "search":
                var customId=customId
                var title =lang.get(interaction.guild.settings.lang).player.modal["title"]
                var label=lang.get(interaction.guild.settings.lang).player.modal["label"]
                var placeholder=lang.get(interaction.guild.settings.lang).player.modal["placeholder"]
                modallayout.execute(interaction,bot.client,customId,title,label,placeholder)
            break;
            default:
                playerbuttons.execute(interaction,player,lang,customId,playerUser)
            break;
        }
    }
}