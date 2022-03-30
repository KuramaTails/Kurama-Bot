module.exports = {
	async execute(oldRole,newRole) {
        let selChannel = await newRole.guild.channels.cache.find(channel => channel.name == "choose-role")
        var allMessages = await selChannel.messages.fetch()
        let chooseRoleMessage = await allMessages.find(message => message.embeds[0] != null)
        var chooseRoleButtons = chooseRoleMessage.components[0]
        if (chooseRoleButtons.components.find(button => button.label == oldRole.name)) {
            chooseRoleButtons.components.find(button => button.label == oldRole.name).label= newRole.name
            await chooseRoleMessage.edit({components:[chooseRoleButtons]})
        }
        var roleSettingsChannel = await newRole.guild.channels.cache.find(channel => channel.name == "bot-settings")
        var roleChannelMessages = await roleSettingsChannel.messages.fetch()
        var selectRoleEmbed = await roleChannelMessages.find(message => message.embeds[0].title.includes("Choose role"));
        var selectRoleMenu = selectRoleEmbed.components[0]
        if (selectRoleMenu.components[0].options.find(option => option.label == oldRole.name)) {
            selectRoleMenu.components[0].options.find(option => option.label == oldRole.name).label= newRole.name
            await selectRoleEmbed.edit({components:[selectRoleMenu]})
        }
        console.log(`Role ${oldRole.name} updated into ${newRole.name} in ${newRole.guild.name}`)
    }
};