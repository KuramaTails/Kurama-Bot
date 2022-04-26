const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    async execute(interaction,channel,lang,plugins) {
        var leaverPlugin = plugins.leaverPlugin
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Leaver Text")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Leaver text set to : "+` \`${leaverPlugin.textLeave}\``,"Click here below for change it")
        const button = new MessageActionRow()
        button.addComponents(
            new MessageButton()
            .setCustomId(`settings-leaver-textLeaver`)
            .setLabel("Change text")
            .setStyle(`SECONDARY`),
        )
        await channel.send({embeds:[embed],components:[button]})
    }
}