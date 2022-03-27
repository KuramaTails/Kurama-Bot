const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const channelsSchema = require("../schemas/channels-schema");
const rolesSchema = require("../schemas/roles-schema");
module.exports = {
	async execute(guild) {
        try {
            var channelId = await guild.channels.cache.find(channel => channel.name == "choose-role")
            var selectedChannel = await guild.channels.resolve(channelId)
            var buttons = [new MessageActionRow()]
            const rolesEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Add Role')
                                .setDescription(`Click on a button to get yourself a role`)
            await guild.roles.cache.forEach(role => {
                if (role.permissions.has("ADMINISTRATOR")== false) {
                    if (role.managed== false) {
                        if(role.name != "@everyone") 
                        {
                            if (buttons[buttons.length-1].components.length<5) {
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`role-${role.id}`)
                                        .setLabel(`${role.name}`)
                                        .setStyle("PRIMARY"),
                                ); 
                            }
                            else {
                                buttons[buttons.length] = new MessageActionRow()
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`role-${role.id}`)
                                        .setLabel(`${role.name}`)
                                        .setStyle("PRIMARY"),
                                );
                            }
                        }
                    }
                }
            });
            await selectedChannel.send({embeds: [rolesEmbed],components: buttons})
        } catch (error) {
            console.log(error)
        }
    }
};
