const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

module.exports = {
    async execute(interaction,channel,lang) {
        const twitchEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Select Streamers")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        twitchEmbed.addField("Click for add","Add")
        const modalButton = new MessageActionRow()
        modalButton.addComponents(
            new MessageButton()
            .setCustomId(`settings-twitch-twitch`)
            .setLabel("Click here")
            .setStyle(`SECONDARY`),
        )
        const twitchSelectChannel = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Select Notifications Channel")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Select a channel here below","This will be used to send notification when a streamer goes live")
        const twitchSelectMenu = new MessageActionRow()
        twitchSelectMenu.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-twitch-SelectChannel')
                .setPlaceholder("No channel selected")
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

