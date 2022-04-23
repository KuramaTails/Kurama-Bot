const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Ticket Zone")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).settings["createTicketZoneField1"],lang.get(interaction.guild.lang).settings["createTicketZoneField2"])
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`settings-bot-ticketZone`)
            .setLabel(lang.get(interaction.guild.lang).settings["createTicketZoneBtn"])
            .setStyle(`SECONDARY`),
        )
        channel.send({embeds:[Embed],components:[buttons]})
    }
};
