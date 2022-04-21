const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	async execute(channel,lang) {
        try {
            var buttons = [new MessageActionRow()]
            const rolesEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(lang.get(channel.guild.lang).autorole["title"])
                                .setDescription(lang.get(channel.guild.lang).autorole["desc"])
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
                await channel.send({embeds: [rolesEmbed],components: buttons})
            } catch (error) {
                console.log(error) 
            }
            
        } catch (error) {
            console.log(error)
        }
    }
};
