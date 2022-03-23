const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Serverstats")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription("Thanks for starting the tutorial. Let's start")
        .addField("Do you want to have a section regarding your server statistics?","(Members, Online and Offline channels will be created)")
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
