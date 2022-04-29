const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    async execute(interaction,channel,lang,plugins) {
        var leaverPlugin = plugins.leaverPlugin
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Leaver Text")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).plugins.leaverPlugin["text"],` \`${leaverPlugin.textLeave}\``)
        const button = new MessageActionRow()
        button.addComponents(
            new MessageButton()
            .setCustomId(`settings-leaver-textLeaver`)
            .setLabel(lang.get(interaction.guild.settings.lang).plugins.leaverPlugin["changeText"])
            .setStyle(`SECONDARY`),
        )
        await channel.send({embeds:[embed],components:[button]})
    }
}