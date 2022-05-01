module.exports = {
    name: 'roleUpdate',
	async execute(oldRole,newRole) {
        if (oldRole.name != newRole.name) {
            try {
                let selChannel = await newRole.guild.channels.cache.find(channel => channel.name == role.guild.settings.plugins.chooseRolePlugin.channelId)
                var roleSettingsChannel = await newRole.guild.channels.cache.find(channel => channel.name == "bot-settings")
                if (!selChannel) return
                if (!roleSettingsChannel) return
                var allMessages = await selChannel.messages.fetch()
                var roleChannelMessages = await roleSettingsChannel.messages.fetch()
                let chooseRoleMessage = await allMessages.find(message => message.embeds[0] != null)
                var selectRoleEmbed = await roleChannelMessages.find(message => message.embeds[0].title.includes("Choose role"));
                var chooseRoleButtons = chooseRoleMessage.components[0]
                if (chooseRoleButtons.components.find(button => button.label == oldRole.name)) {
                    chooseRoleButtons.components.find(button => button.label == oldRole.name).label= newRole.name
                    await chooseRoleMessage.edit({components:[chooseRoleButtons]})
                }
                var selectRoleMenu = selectRoleEmbed.components[0]
                if (selectRoleMenu.components[0].options.find(option => option.label == oldRole.name)) {
                    selectRoleMenu.components[0].options.find(option => option.label == oldRole.name).label= newRole.name
                    await selectRoleEmbed.edit({components:[selectRoleMenu]})
                }
            } catch (error) {
                console.log(error)
            }
            console.log(`Role ${oldRole.name} updated into ${newRole.name} in ${newRole.guild.name}`)
        }
	}
};