const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    part:1,
    async execute(interaction,lang) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial : Language selection")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(lang.get(interaction.guild.lang).tutorial.selectLang["desc"])
        .addField(lang.get(interaction.guild.lang).tutorial.selectLang["field1"],lang.get(interaction.guild.lang).tutorial.selectLang["field2"])
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
