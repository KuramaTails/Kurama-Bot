module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        try {
            var welcomerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "welcomer-settings")
            var playerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "player-settings")
            var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
            var playerChannelMessages = await playerSettingsChannel.messages.fetch()
            var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("Choose channel"));
            var selectPlayerEmbed = await playerChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
            var welcomerMenuOptions = selectWelcomerEmbed.components[0].components[0].options
            for (let i = 0; i < welcomerMenuOptions.length; i++) {
                if (welcomerMenuOptions[i].label == channel.name) {
                    selectWelcomerEmbed.components[0].components[0].spliceOptions(i,1)
                }
            }
            await selectWelcomerEmbed.edit({components:[selectWelcomerEmbed.components[0]]})
            var playerMenuOptions = selectPlayerEmbed.components[0].components[0].options
            for (let i = 0; i < playerMenuOptions.length; i++) {
                if (playerMenuOptions[i].label == channel.name) {
                    selectPlayerEmbed.components[0].components[0].spliceOptions(i,1)
                }
            }
            await selectPlayerEmbed.edit({components:[selectPlayerEmbed.components[0]]})
        } catch (error) {
            console.log(error)
        }
	    console.log(`Channel deleted in ${channel.guild.name}`)
    }
};