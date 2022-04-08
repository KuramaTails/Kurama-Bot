const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Ticket Zone")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Click here for creating a ticket zone:","this will be used by members for any issue")
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`bot-ticketZone`)
            .setLabel("Create Ticket Zone")
            .setStyle(`SECONDARY`),
        )
        channel.send({embeds:[Embed],components:[buttons]})
    }
};
