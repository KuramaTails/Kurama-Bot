module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel,newChannel) {
        if (oldChannel.name != newChannel.name) {
            if (oldChannel.name.includes("Online") || oldChannel.name.includes("Offline") || oldChannel.name.includes("Members")) return
            console.log(oldChannel.name)
            var welcomerSettingsChannel = await newChannel.guild.channels.cache.find(channel => channel.name == "welcomer-plugin")
            var botSettingsChannel = await newChannel.guild.channels.cache.find(channel => channel.name == "bot-settings")
            var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
            var botChannelMessages = await botSettingsChannel.messages.fetch()
            if (!welcomerChannelMessages) return
            if (!botSettingsChannel) return
            var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("Choose channel"));
            var selectPlayerEmbed = await botChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
            var welcomerMenu = selectWelcomerEmbed.components[0]
            if (welcomerMenu.components[0].options.find(option => option.label == oldChannel.name)) {
                welcomerMenu.components[0].options.find(option => option.label == oldChannel.name).label= newChannel.name
                await selectWelcomerEmbed.edit({components:[welcomerMenu]})
            }
            var playerMenu = selectPlayerEmbed.components[0]
            if (playerMenu.components[0].options.find(option => option.label == oldChannel.name)) {
                playerMenu.components[0].options.find(option => option.label == oldChannel.name).label= newChannel.name
                await selectPlayerEmbed.edit({components:[playerMenu]})
            }
            console.log(`Channel ${oldChannel.name} updated into ${newChannel.name} in ${newChannel.guild.name}`)
            }
    }
};