const { MessageEmbed } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Warn: Channel Information")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(lang.get(interaction.guild.settings.lang).zones.adminZone.warn["desc"])
        .addField(lang.get(interaction.guild.settings.lang).zones.adminZone.warn["field1"],lang.get(interaction.guild.settings.lang).zones.adminZone.warn["field2"])
        channel.send({embeds:[Embed]})
    }
};