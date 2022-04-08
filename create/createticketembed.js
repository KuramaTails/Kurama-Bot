const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Ticket Zone")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Click here for creating a new ticket:","you can use this for report any issue to this discord's admins")
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`ticket-create`)
            .setLabel("Create New Ticket")
            .setStyle(`SECONDARY`),
        )
        channel.send({embeds:[Embed],components:[buttons]})
    }
};