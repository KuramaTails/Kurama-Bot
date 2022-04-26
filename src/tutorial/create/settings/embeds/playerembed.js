const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
	async execute(interaction,channel,lang) {
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (5/6) : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part5["field1"],lang.get(interaction.guild.settings.lang).tutorial.part5["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-bot-SelectPlayerChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).tutorial["selectPlayerChannel"])
                
        )
        var textChannels = interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
        textChannels.forEach(channel => {
            button1.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
}
