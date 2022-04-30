const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Language selection")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(lang.get(interaction.guild.settings.lang).settings.embeds.selectLang["desc"])
        .addField(lang.get(interaction.guild.settings.lang).settings.embeds.selectLang["field1"],lang.get(interaction.guild.settings.lang).settings.embeds.selectLang["field2"])
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-en`)
            .setLabel(lang.get(interaction.guild.settings.lang).langs["en"])
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-it`)
            .setLabel(lang.get(interaction.guild.settings.lang).langs["it"])
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-es`)
            .setLabel(lang.get(interaction.guild.settings.lang).langs["es"])
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-de`)
            .setLabel(lang.get(interaction.guild.settings.lang).langs["de"])
            .setStyle(`SECONDARY`),
        )
        buttons.components.find(button => button.customId.includes(interaction.guild.settings.lang)).disabled=true
        await channel.send({embeds:[TutorialEmbed],components:[buttons]})
    }
};
