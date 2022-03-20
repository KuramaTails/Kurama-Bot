const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const channelsSchema = require("../schemas/channels-schema");
const rolesSchema = require("../schemas/roles-schema");
module.exports = {
	async execute(guild) {
        try {
            var selectGuildchannels = await channelsSchema.find({ "_id" : guild.id})
            var keysChannels = Array.from(selectGuildchannels[0].channels.keys())
            var listTextChannels = []
            for (let i = 0; i < keysChannels.length; i++) {
                if (selectGuildchannels[0].channels.get(keysChannels[i]).name == "choose-role") {
                    listTextChannels.push(keysChannels[i])
                }
            }
            var selectedChannel = await guild.channels.resolve(listTextChannels[0])
            var buttons = [new MessageActionRow()]
            const rolesEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Add Role')
                                .setDescription(`Click on a button to get yourself a role`)
            var selectGuildroles = await rolesSchema.find({ "_id" : guild.id})
            var keysRoles = Array.from(selectGuildroles[0].channels.keys())
            var listTextChannels = []
            for (let i = 0; i < keysRoles.length; i++) {
                if (selectGuildroles[0].channels.get(keysRoles[i]).name == "choose-role") {
                    listTextChannels.push(keysChannels[i])
                }
                if (selectGuildroles[0].channels.get(keysRoles[i]).admin== false) {
                    if (selectGuildroles[0].channels.get(keysRoles[i]).managed== false) {
                        if(selectGuildroles[0].channels.get(keysRoles[i]).name != "@everyone") 
                        {
                            if (buttons[buttons.length-1].components.length<5) {
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`${keysRoles[i]}`)
                                        .setLabel(`${selectGuildroles[0].channels.get(keysRoles[i]).name}`)
                                        .setStyle("PRIMARY"),
                                ); 
                            }
                            else {
                                buttons[buttons.length] = new MessageActionRow()
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`${keysRoles[i]}`)
                                        .setLabel(`${selectGuildroles[0].channels.get(keysRoles[i]).name}`)
                                        .setStyle("PRIMARY"),
                                );
                            }
                        }
                    }
                }
            }

            switch (buttons.length-1) {
                case 0:
                    selectedChannel.send({embeds: [rolesEmbed],components: [buttons[0]]})
                break;
                case 1:
                    selectedChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1]]})
                break;
                case 2:
                    selectedChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1],buttons[2]]})
                break;
                case 3:
                    selectedChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1],buttons[2],buttons[3]]})
                break;
                case 4:
                    selectedChannel.send({embeds: [rolesEmbed],components: [buttons[0],buttons[1],buttons[2],buttons[3],buttons[4]]})
                break;
            }
        } catch (error) {
            console.log(error)
        }
    }
};
