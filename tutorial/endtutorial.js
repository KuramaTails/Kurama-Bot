const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : End Tutorial")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription("Everything set up. \n Below you will find other text channels where you can set me up in the future. This channel will be deleted after clicking on the button below")
        .addField("Tip: Use the / for a complete list of all usable commands, otherwise use /help to get a list with all categories","Warning: Do not delete the channels below, you will need them later in order to change bot settings")
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`Tutorialstart`)
            .setLabel("🏁")
            .setStyle(`SECONDARY`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};