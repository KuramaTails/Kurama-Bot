const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	async execute(role) {
        try {
            
            var listChannels = role.guild.channels.cache
            var keysChannels = Array.from(listChannels.keys())
            for (let i = 0; i < keysChannels.length; i++) {
                switch (listChannels.get(keysChannels[i]).name) {
                    case "choose-role":
                        var selChannel = listChannels.get(keysChannels[i])
                        var allMessages = await selChannel.messages.fetch()
                        var keysMessages = Array.from(allMessages.keys())
                        for (let i = 0; i < keysMessages.length; i++) {
                            if(allMessages.get(keysMessages[i]).embeds[0] != null) {
                                var selMessage = allMessages.get(keysMessages[i])
                            }
                        }
                        console.log(selMessage)
                        var roles = await role.guild.roles.fetch()
                        let keys = Array.from( roles.keys() );
                        const filteredkeys = []
                        for (let i = 0; i < keys.length; i++) {
                            if (!roles.get(keys[i]).managed ){
                                if (roles.get(keys[i]).name != "@everyone"){
                                    filteredkeys.push(keys[i])
                                }
                            }
                        }
                        var button1 = new MessageActionRow()
                        var button2 = new MessageActionRow()
                        var button3 = new MessageActionRow()
                        var button4 = new MessageActionRow()
                        var button5 = new MessageActionRow()
                        for (let i = 0; i < filteredkeys.length; i++) {
                            switch (true) {
                                case button1.components.length<5:
                                    button1.addComponents(
                                        new MessageButton()
                                            .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                            .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                            .setStyle("PRIMARY"),
                                    );
                                break;
                                case button2.components.length<5:
                                    button2.addComponents(
                                        new MessageButton()
                                            .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                            .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                            .setStyle("PRIMARY"),
                                    );
                                break;
                                case button3.components.length<5:
                                    button3.addComponents(
                                        new MessageButton()
                                            .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                            .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                            .setStyle("PRIMARY"),
                                    );
                                break;
                                case button4.components.length<5:
                                    button4.addComponents(
                                        new MessageButton()
                                            .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                            .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                            .setStyle("PRIMARY"),
                                    );
                                break;
                                case button5.components.length<5:
                                    button5.addComponents(
                                        new MessageButton()
                                            .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                            .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                            .setStyle("PRIMARY"),
                                    );
                                break;
                            }
                        }
                        switch (keysMessages.length) {
                            case 0:
                                const newEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Add Role')
                                .setDescription(`Click on a button to get yourself a role`)
                                switch (true) {
                                    case button5.components.length!=0:
                                        selChannel.send({embeds: [newEmbed],components: [button1,button2,button3,button4,button5] })
                                        break;
                                    case button4.components.length!=0:
                                        selChannel.send({embeds: [newEmbed],components: [button1,button2,button3,button4] })
                                        break;
                                    case button3.components.length!=0:
                                        selChannel.send({embeds: [newEmbed],components: [button1,button2,button3] })
                                        break;
                                    case button2.components.length!=0:
                                        selChannel.send({embeds: [newEmbed],components: [button1,button2,] })
                                        break;
                                    case button1.components.length!=0:
                                        selChannel.send({embeds: [newEmbed],components: [button1] })
                                        break;
                                }
                                break;
                        
                            default:
                                switch (true) {
                                    case button5.components.length!=0:
                                        selMessage.edit({components: [button1,button2,button3,button4,button5] })
                                        break;
                                    case button4.components.length!=0:
                                        selMessage.edit({components: [button1,button2,button3,button4] })
                                        break;
                                    case button3.components.length!=0:
                                        selMessage.edit({components: [button1,button2,button3] })
                                        break;
                                    case button2.components.length!=0:
                                        selMessage.edit({components: [button1,button2,] })
                                        break;
                                    case button1.components.length!=0:
                                        selMessage.edit({components: [button1] })
                                        break;
                                }
                                break;
                        }
                    break;
                }   
            }
        } catch (error) {
            console.log(error)
        }
    }
};
