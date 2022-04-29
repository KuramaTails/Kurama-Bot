const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

module.exports = {
    async execute(interaction,channel,lang) {
        const twitchEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Select Streamers")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        twitchEmbed.addField(lang.get(interaction.guild.settings.lang).plugins.twitchPlugin.embed["addStreamerdesc1"],lang.get(interaction.guild.settings.lang).plugins.twitchPlugin.embed["addStreamerdesc2"])
        const modalButton = new MessageActionRow()
        modalButton.addComponents(
            new MessageButton()
            .setCustomId(`settings-twitch-addStreamer`)
            .setLabel(lang.get(interaction.guild.settings.lang).plugins.twitchPlugin.embed["bnt1"])
            .setStyle(`SECONDARY`),
        )
        const twitchSelectChannel = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Select Notifications Channel")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).plugins.twitchPlugin.embed["selectChanneldesc1"],lang.get(interaction.guild.settings.lang).plugins.twitchPlugin.embed["selectChanneldesc2"])
        const twitchSelectMenu = new MessageActionRow()
        twitchSelectMenu.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-twitch-SelectChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
        )
        var textChannels = interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
        textChannels.forEach(channel => {
            twitchSelectMenu.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        await channel.send({embeds:[twitchEmbed],components:[modalButton]})
        await channel.send({embeds:[twitchSelectChannel],components:[twitchSelectMenu]})
    }
}

