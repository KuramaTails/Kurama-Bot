const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Language selection")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(lang.get(interaction.guild.settings.lang).tutorial.selectLang["desc"])
        .addField(lang.get(interaction.guild.settings.lang).tutorial.selectLang["field1"],lang.get(interaction.guild.settings.lang).tutorial.selectLang["field2"])
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-en`)
            .setLabel("English")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-it`)
            .setLabel("Italian")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-es`)
            .setLabel("Spanish")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-de`)
            .setLabel("German")
            .setStyle(`SECONDARY`),
        )

        await channel.send({embeds:[TutorialEmbed],components:[buttons]})
    }
};
