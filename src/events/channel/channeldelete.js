module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        try {
            var listChannels = await channel.guild.channels.fetch()
            var filteredChannels = listChannels.filter(c=> c.type=="GUILD_TEXT")
            var par = channel.guild.channels.cache.find(channel =>channel.name.includes("Kurama"))
            if (par) par.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
            var par1 = channel.guild.channels.cache.find(channel =>channel.name == "Ticket Zone")
            if (par1) par1.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
            var par2 = channel.guild.channels.cache.find(channel =>channel.name == "Admin Zone")
            if (par2) par2.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
            var botSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "bot-settings")
            var botChannelMessages = await botSettingsChannel.messages.fetch()
            var selectPlayerEmbed = await botChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
            var channelsonMenu = selectPlayerEmbed.components[0]
            channelsonMenu.components[0].spliceOptions(0,channelsonMenu.components[0].options.length)
            await filteredChannels.forEach(async channel => {
                await channelsonMenu.components[0].addOptions([
                    {
                        label: `${channel.name}`,
                        value: `${channel.id}`,
                    },
                ])
            });
            var selectRoleChannelEmbed = await botChannelMessages.find(message => message.embeds[0].title.includes("Choose Role"));
            await selectPlayerEmbed.edit({components:[channelsonMenu]})
            await selectRoleChannelEmbed.edit({components:[channelsonMenu]})

            var welcomerSettingsChannel = await channel.guild.channels.cache.find(channel => channel.name == "welcomer-plugin")
            if (welcomerSettingsChannel) {
                var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
                var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("channel"));
                await selectWelcomerEmbed.edit({components:[channelsonMenu]})
            }
            var twitchPluginChannel = await channel.guild.channels.cache.find(channel => channel.name == "twitch-plugin")
            if (twitchPluginChannel) {
                var twitchPluginMessages = await twitchPluginChannel.messages.fetch()
                var selectTwittchEmbed = await twitchPluginMessages.find(message => message.embeds[0].title.includes("Channel"));
                await selectTwittchEmbed.edit({components:[channelsonMenu]})
            }
        } catch (error) {
            console.log(error)
        }
	    console.log(`Channel deleted in ${channel.guild.name}`)
    }
};