const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	async execute(role) {
        try {
            var listChannels = role.guild.channels.cache
            let selChannel = await listChannels.find(channel => channel.name.includes("choose-role"))
            var allMessages = await selChannel.messages.fetch()
            let selMessage = await allMessages.find(message => message.embeds[0] != null)
            let commandsList = await role.guild.commands.fetch()
            let moderationCommandId = await commandsList.find(command => command.name === "moderation").id
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
            var roles = await role.guild.roles.fetch()
            var buttons = [new MessageActionRow()]
            roles.forEach(role => {
                if (!role.permissions.has("ADMINISTRATOR")) {
                    if (!role.managed) {
                        if(role.name != "@everyone") {
                            if (buttons[buttons.length-1].components.length<5) {
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`${role.id}`)
                                        .setLabel(`${role.name}`)
                                        .setStyle("PRIMARY"),
                                ); 
                            }
                            else {
                                buttons[buttons.length] = new MessageActionRow()
                                console.log(buttons)
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`${role.id}`)
                                        .setLabel(`${role.name}`)
                                        .setStyle("PRIMARY"),
                                );
                            }
                        }
                    }
                }
            });
            switch (buttons.length-1) {
                case 0:
                    selMessage.edit({components: [buttons[0]]})
                break;
                case 1:
                    selMessage.edit({components: [buttons[0],buttons[1]]})
                break;
                case 2:
                    selMessage.edit({components: [buttons[0],buttons[1],buttons[2]]})
                break;
                case 3:
                    selMessage.edit({components: [buttons[0],buttons[1],buttons[2],buttons[3]]})
                break;
                case 4:
                    selMessage.edit({components: [buttons[0],buttons[1],buttons[2],buttons[3],buttons[4]]})
                break;
            }
            console.log(`Roles updated in ${role.guild.name}`)
        } catch (error) {
            console.log(error)
        }
    }
};
