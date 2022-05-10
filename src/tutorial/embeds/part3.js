const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const welcomezone = require("../create/zone/welcomezone")
module.exports = {
    part:4,
    async execute(interaction,lang,button) {
        button=="yes"? await welcomezone.execute(interaction,lang) : ""
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (3/5) : Player Channels")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part3["field1"],lang.get(interaction.guild.settings.lang).tutorial.part3["field2"])
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