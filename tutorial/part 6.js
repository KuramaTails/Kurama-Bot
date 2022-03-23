const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Autorole")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Do you want me to autoassign roles for new members?","You will be able to select it in the channel that will be created below")
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`Tutorialyes`)
            .setLabel("Yes")
            .setStyle(`SUCCESS`),
        )
        button1.addComponents(
            new MessageButton()
            .setCustomId(`Tutorialno`)
            .setLabel("No")
            .setStyle(`DANGER`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};