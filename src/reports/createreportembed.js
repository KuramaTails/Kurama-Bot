const { MessageEmbed } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Report Start")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).ticket["createEmbedField1"],lang.get(interaction.guild.lang).ticket["createEmbedField2"])
        channel.send({embeds:[Embed]})
    }
};