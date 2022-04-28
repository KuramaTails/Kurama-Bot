const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Ticket Zone")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).zones.ticketZone["createEmbedField1"],lang.get(interaction.guild.settings.lang).zones.ticketZone["createEmbedField2"])
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`ticket-createTicket`)
            .setLabel(lang.get(interaction.guild.settings.lang).zones.ticketZone["createBtn"])
            .setStyle(`SECONDARY`),
        )
        channel.send({embeds:[Embed],components:[buttons]})
    }
};