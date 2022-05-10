const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel,newChannel) {
        if (oldChannel.name != newChannel.name) {
            if (oldChannel.name.includes("Online") || oldChannel.name.includes("Offline") || oldChannel.name.includes("Members")) return
            try {
                var botSettingsChannel = await oldChannel.guild.channels.cache.find(channel => channel.name == "bot-settings")
                if(!botSettingsChannel) return
                var listChannels = await oldChannel.guild.channels.fetch()
                var filteredChannels = listChannels.filter(c=> c.type=="GUILD_TEXT")
                var par = oldChannel.guild.channels.cache.find(channel =>channel.name.includes("Kurama"))
                if (par) par.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
                var par1 = oldChannel.guild.channels.cache.find(channel =>channel.name == "Ticket Zone")
                if (par1) par1.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
                var par2 = oldChannel.guild.channels.cache.find(channel =>channel.name == "Admin Zone")
                if (par2) par2.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
    
                const selectMenu = new MessageActionRow()
                selectMenu.addComponents(
                    new MessageSelectMenu()
                    .setCustomId('')
                    .setPlaceholder('none')    
                )
                await filteredChannels.forEach(async channel => {
                    await selectMenu.components[0].addOptions([
                        {
                            label: `${channel.name}`,
                            value: `${channel.id}`,
                        },
                    ])
                });
                var plugins = oldChannel.guild.settings.plugins
                var channelList = oldChannel.guild.channels.cache
                var botChannelMessages = await botSettingsChannel.messages.fetch()
    
                var selectPlayerEmbed = await botChannelMessages.find(message => message.embeds[0].title.includes("Set up player"));
                selectMenu.components[0].setCustomId("settings-bot-selectPlayerChannel")
                if (plugins.playerPlugin.channelId) {
                    var selectedChannel = channelList.find(channel => channel.id == plugins.playerPlugin.channelId)
                    selectMenu.components[0].setPlaceholder(selectedChannel.name)
                }
                await selectPlayerEmbed.edit({components:[selectMenu]})
    
                var selectRoleChannelEmbed = await botChannelMessages.find(message => message.embeds[0].title.includes("Choose Role"));
                selectMenu.components[0].setCustomId("settings-bot-selectChooseRoleChannel")
                if (plugins.chooseRolePlugin.channelId) {
                    var selectedChannel = channelList.find(channel => channel.id == plugins.chooseRolePlugin.channelId)
                    selectMenu.components[0].setPlaceholder(selectedChannel.name)
                }
                await selectRoleChannelEmbed.edit({components:[selectMenu]})
    
                var welcomerSettingsChannel = await channelList.find(channel => channel.name == "welcomer-plugin")
                if (welcomerSettingsChannel) {
                    var welcomerChannelMessages = await welcomerSettingsChannel.messages.fetch()
                    var selectWelcomerEmbed = await welcomerChannelMessages.find(message => message.embeds[0].title.includes("channel"));
                    selectMenu.components[0].setCustomId("settings-welcomer-selectWelcomerChannel")
                    if (plugins.welcomerPlugin.channelId) {
                        var selectedChannel = channelList.find(channel => channel.id == plugins.welcomerPlugin.channelId)
                        selectMenu.components[0].setPlaceholder(selectedChannel.name)
                    }
                    await selectWelcomerEmbed.edit({components:[selectMenu]})
                }
                var twitchPluginChannel = await channelList.find(channel => channel.name == "twitch-plugin")
                if (twitchPluginChannel) {
                    var twitchPluginMessages = await twitchPluginChannel.messages.fetch()
                    var selectTwittchEmbed = await twitchPluginMessages.find(message => message.embeds[0].title.includes("Channel"));
                    selectMenu.components[0].setCustomId("settings-twitch-selectChannel")
                    if (plugins.twitchPlugin.channelId) {
                        var selectedChannel = channelList.find(channel => channel.id == plugins.twitchPlugin.channelId)
                        selectMenu.components[0].setPlaceholder(selectedChannel.name)
                    }
                    await selectTwittchEmbed.edit({components:[selectMenu]})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
};