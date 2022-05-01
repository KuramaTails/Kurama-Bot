const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	async execute(channel,lang) {
        try {
            console.log(channel.guild.settings.lang)
            var buttons = [new MessageActionRow()]
            const rolesEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(lang.get(channel.guild.settings.lang).chooseRole["title"])
                                .setDescription(lang.get(channel.guild.settings.lang).chooseRole["desc"])
            await channel.guild.roles.cache.forEach(role => {
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
            try {
                buttons[0].components[0]? await channel.send({embeds: [rolesEmbed],components: buttons}) : await channel.send({embeds: [rolesEmbed]})
            } catch (error) {
                console.log(error) 
            }
            
        } catch (error) {
            console.log(error)
        }
    }
};
