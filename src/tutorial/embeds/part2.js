const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const serverstatszone = require("../create/zone/serverstatszone")

module.exports = {
    part:3,
    async execute(interaction,lang,button) {
        button=="yes"? await serverstatszone.execute(interaction,lang) : ""
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (2/6) : Welcome Channels")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part2["field1"],lang.get(interaction.guild.settings.lang).tutorial.part2["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-yes`)
            .setLabel(lang.get(interaction.guild.settings.lang).tutorial.buttons["yes"])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`tutorial-no`)
            .setLabel(lang.get(interaction.guild.settings.lang).tutorial.buttons["no"])
            .setStyle(`DANGER`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};