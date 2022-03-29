const {  MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	async execute(role) {
        let selChannel = await role.guild.channels.cache.find(channel => channel.name == "choose-role")
        var allMessages = await selChannel.messages.fetch()
        let chooseRoleMessage = await allMessages.find(message => message.embeds[0] != null)
        let moderationCommandId = await role.guild.commands.cache.find(command => command.name === "moderation").id
        var permissions = []
        
        if (role.permissions.has("ADMINISTRATOR")) {
            permissions = [{
                id: role.id,
                    type: 'ROLE',
                    permission: true,
            }];
        }
        else {
            permissions = [{
                id: role.id,
                    type: 'ROLE',
                    permission: false,
            }];
        }
        await role.guild.commands.permissions.add({ command: moderationCommandId,permissions: permissions})
            .then(console.log(`Set permissions in ${role.guild.name}`))
            .catch(console.error);
        var roleMenu = chooseRoleMessage.components[0]
        if (roleMenu.components.length<5) {
            roleMenu.addComponents(
                new MessageButton()
                    .setCustomId(`${role.id}`)
                    .setLabel(`${role.name}`)
                    .setStyle("PRIMARY"),
            ); 
            await chooseRoleMessage.edit({components:[roleMenu]})
        }
        else {
            newComponents = new MessageActionRow()
            newComponents.addComponents(
                new MessageButton()
                    .setCustomId(`${role.id}`)
                    .setLabel(`${role.name}`)
                    .setStyle("PRIMARY"),
            );
            await chooseRoleMessage.edit({components:[roleMenu,newComponents]})
        }            
        var roleSettingsChannel = await role.guild.channels.cache.find(channel => channel.name == "bot-settings")
		var roleChannelMessages = await roleSettingsChannel.messages.fetch()
		var selectRoleEmbed = await roleChannelMessages.find(message => message.embeds[0].title.includes("Choose role"));
		var roleMenu = selectRoleEmbed.components[0]
		await roleMenu.components[0].addOptions([
			{
				label: `${role.name}`,
				value: `${role.id}`,
			},
		])
		await selectRoleEmbed.edit({components:[roleMenu]})
        console.log(`Roles updated in ${role.guild.name}`)
    }
};
