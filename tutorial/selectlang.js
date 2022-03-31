const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial : Language selection")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription("Thanks for starting the tutorial. Let's start choosing a language")
        .addField("This will be used for this tutorial aswell in your discord","Tips: You will be able to change it later in #botsettings channel")
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-en`)
            .setLabel("English")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-it`)
            .setLabel("Italian")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-es`)
            .setLabel("Spanish")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-de`)
            .setLabel("German")
            .setStyle(`SECONDARY`),
        )

        interaction.channel.send({embeds:[TutorialEmbed],components:[buttons]})
    }
};
