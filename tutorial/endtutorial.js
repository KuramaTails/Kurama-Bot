const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,lang) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : End Tutorial")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(lang.get(interaction.guild.lang).tutorial.end["desc"])
        .addField(lang.get(interaction.guild.lang).tutorial.end["field1"],lang.get(interaction.guild.lang).tutorial.end["field2"])

        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-end`)
            .setLabel("🏁")
            .setStyle(`SECONDARY`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};