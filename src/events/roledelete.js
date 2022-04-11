const bot = require("../../bot");

module.exports = {
    name: 'roleDelete',
	async execute(role) {
        if (bot.cooldownPresence.has(role.guild.id)) {return}
        try {
            bot.cooldownUser.set(role.id, true);
            let selChannel = await role.guild.channels.cache.find(channel => channel.name == "choose-role")
            var allMessages = await selChannel.messages.fetch()
            let chooseRoleMessage = await allMessages.find(message => message.embeds[0] != null)
            let moderationCommandId = await role.guild.commands.cache.find(command => command.name === "moderation").id
            var roleSettingsChannel = await role.guild.channels.cache.find(channel => channel.name == "bot-settings")
            var roleChannelMessages = await roleSettingsChannel.messages.fetch()
            var selectRoleEmbed = await roleChannelMessages.find(message => message.embeds[0].title.includes("Choose role"));
            await role.guild.commands.permissions.remove({ command: moderationCommandId,roles: [role.id]})
                .then(console.log(`Set permissions in ${role.guild.name}`))
                .catch(console.error);
            var roleMenu = chooseRoleMessage.components
            for (let i = 0; i < roleMenu.length; i++) {
                for (let y = 0; y < roleMenu[i].components.length; y++) {
                    if (roleMenu[i].components[y].customId == role.id) {
                        await roleMenu[i].spliceComponents(y,1)
                        await chooseRoleMessage.edit({components: roleMenu})
                    }
                }
            }
            var roleMenuOptions = selectRoleEmbed.components[0].components[0].options
            for (let i = 0; i < roleMenuOptions.length; i++) {
                if (roleMenuOptions[i].label == role.name) {
                    selectRoleEmbed.components[0].components[0].spliceOptions(i,1)
                }
            }
            await selectRoleEmbed.edit({components:[selectRoleEmbed.components[0]]})
            console.log(`Roles updated in ${role.guild.name}`)
        } catch (error) {
            console.log(error)	
        } finally {
            console.log(`Role deleted in ${role.guild.name}`)
            setTimeout(() => {
                bot.cooldownUser.delete(role.id);
            }, 5*1000);
        }
	}
};