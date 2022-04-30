module.exports = {
    name: 'channelCreate',
    async execute(channel) {
        try {
            var welcomerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "welcomer-plugin")
            var botSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "bot-settings")
            var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
            var botChannelMessages = await botSettingsChannel.messages.fetch()
            if (!welcomerChannelMessages) return
            if (!botSettingsChannel) return
            var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("Choose channel"));
            var selectPlayerEmbed = await botChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
            var welcomerMenu = selectWelcomerEmbed.components[0]
            await welcomerMenu.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
            await selectWelcomerEmbed.edit({components:[welcomerMenu]})
            var playerMenu = selectPlayerEmbed.components[0]
            await playerMenu.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
            await selectPlayerEmbed.edit({components:[playerMenu]})
        } catch (error) {
            console.log(error)
        }
	    console.log(`Channel created in ${channel.guild.name}`)
    }
};