const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

module.exports = {
    async execute(interaction,channel,lang) {
        const streamerEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Select Streamers")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.embed["addStreamerdesc1"],lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.embed["addStreamerdesc2"])
        const streamerBtn = new MessageActionRow()
        streamerBtn.addComponents(
            new MessageButton()
            .setCustomId(`settings-twitch-addStreamer`)
            .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.embed["btn1"])
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`settings-twitch-deleteStreamer`)
            .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.embed["btn2"])
            .setStyle(`SECONDARY`),
        )
        const twitchSelectChannel = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Select Notifications Channel")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.embed["selectChanneldesc1"],lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.embed["selectChanneldesc2"])
        const twitchSelectMenu = new MessageActionRow()
        twitchSelectMenu.addComponents(
            new MessageSelectMenu()
            .setCustomId('settings-twitch-selectChannel')
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
        await channel.send({embeds:[streamerEmbed],components:[streamerBtn]})
        await channel.send({embeds:[twitchSelectChannel],components:[twitchSelectMenu]})
    }
}

