const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Language Selection")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Please select a language:","this will be used in your entire discord")
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`bot-en`)
            .setLabel("English")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`bot-it`)
            .setLabel("Italian")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`bot-es`)
            .setLabel("Spanish")
            .setStyle(`SECONDARY`),
        )
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`bot-de`)
            .setLabel("German")
            .setStyle(`SECONDARY`),
        )

        channel.send({embeds:[Embed],components:[buttons]})
    }
};
