const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Set up welcomer")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Do you want to activate the welcomer?","Welcome message will be send when new members will join")
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