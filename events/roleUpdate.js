const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
	async execute(guild) {
        try {
            var listChannels = await guild.channels.fetch()
            var keysChannels = Array.from(listChannels.keys())
            for (let i = 0; i < keysChannels.length; i++) {
                switch (listChannels.get(keysChannels[i]).name) {
                    case "choose-role":
                        var selChannel = listChannels.get(keysChannels[i])
                        var allMessages = await selChannel.messages.fetch()
                        var keysMessages = Array.from(allMessages.keys())
                        for (let i = 0; i < keysMessages.length; i++) {
                            if (allMessages.get(keysMessages[i]).embeds.MessageEmbed=== null) { return }
                            else {
                                var selMessage = allMessages.get(keysMessages[i])
                                var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
                                const newEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Add Role')
                                .setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                                .setDescription(`Click on a button for receiving a role`)
                                var roles = await guild.roles.fetch()
                                let keys = Array.from( roles.keys() );
                                const filteredkeys = []
                                for (let i = 0; i < keys.length; i++) {
                                    if (!roles.get(keys[i]).managed ){
                                        if (roles.get(keys[i]).name != "@everyone"){
                                            filteredkeys.push(keys[i])
                                        }
                                    }
                                }
                                if (filteredkeys.length<10){
                                    var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
                                }
                                else {
                                    return console.log("Too many roles") 
                                }
                                const buttons = new MessageActionRow()
                                const buttons2 = new MessageActionRow()
                                for (let i = 0; i < filteredkeys.length; i++) {
                                    if (!roles.get(filteredkeys[i]).managed ){
                                        if (roles.get(filteredkeys[i]).name != "@everyone"){
                                            roles.get(filteredkeys[i]).emoji = emojilist[i]
                                            newEmbed.addFields(
                                                { name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
                                                { name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
                                                { name: '\u200B', value: "\u200B", inline: true })
                                            if (buttons.components.length<5) {
                                                buttons.addComponents(
                                                    new MessageButton()
                                                        .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                                        .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                                        .setStyle("PRIMARY"),
                                                ); 
                                            }
                                            else {
                                                buttons2.addComponents(
                                                    new MessageButton()
                                                        .setCustomId(`${roles.get(filteredkeys[i]).id}`)
                                                        .setLabel(`${roles.get(filteredkeys[i]).name}`)
                                                        .setStyle("PRIMARY"),
                                                ); 
                                            }
                                             
                                    }
                                    }
                                }
                                if (filteredkeys.length<5){
                                    selMessage.edit({embeds: [newEmbed],components: [buttons] })
                                }
                                else {
                                    selMessage.edit({embeds: [newEmbed],components: [buttons,buttons2] })
                                }
                            }
                        }
                    break;
                }   
            }
        } catch (error) {
            console.log(error)
        }
    }
};