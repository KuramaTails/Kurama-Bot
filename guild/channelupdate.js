module.exports = {
	async execute(oldChannel,newChannel) {
        var welcomerSettingsChannel = await newChannel.guild.channels.cache.find(channel => channel.name == "welcomer-settings")
        var playerSettingsChannel = await newChannel.guild.channels.cache.find(channel => channel.name == "player-settings")
        var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
        var playerChannelMessages = await playerSettingsChannel.messages.fetch()
        var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("Choose channel"));
        var selectPlayerEmbed = await playerChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
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
};