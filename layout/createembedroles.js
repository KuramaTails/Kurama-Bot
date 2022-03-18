const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	async execute(messageCreate) {
        try {
            var listChannels = await messageCreate.guild.channels.fetch()
            let selChannel = await listChannels.find(channel => channel.name.includes("choose-role"))
            var roles = await messageCreate.guild.roles.fetch()
            var buttons = [new MessageActionRow()]
            const rolesEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Add Role')
                                .setDescription(`Click on a button to get yourself a role`)
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
                    selChannel.send({embeds: [rolesEmbed],components: [buttons[0]]})
                break;
                case 1:
                    selChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1]]})
                break;
                case 2:
                    selChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1],buttons[2]]})
                break;
                case 3:
                    selChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1],buttons[2],buttons[3]]})
                break;
                case 4:
                    selChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1],buttons[2],buttons[3],buttons[4]]})
                break;
            }
        } catch (error) {
            console.log(error)
        }
    }
};
