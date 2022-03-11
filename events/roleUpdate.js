const { MessageEmbed } = require("discord.js");
module.exports = {
	async execute(guild) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case "choose-role":
                    var selchannel = listchannels.get(keyschannels[i])
                    var allmessages = await selchannel.messages.fetch()
                    var keysmessages = Array.from(allmessages.keys())
                    for (let i = 0; i < keysmessages.length; i++) {
                        if (allmessages.get(keysmessages[i]).embeds.MessageEmbed=== null) { return }
                        else {
                            var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
                            const newEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Add Role')
                            .setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                            .setDescription(`Choose a reaction for receiving a role`)
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
                            for (let i = 0; i < filteredkeys.length; i++) {
                                if (!roles.get(filteredkeys[i]).managed ){
                                    if (roles.get(filteredkeys[i]).name != "@everyone"){
                                        roles.get(filteredkeys[i]).emoji = emojilist[i]
                                        newEmbed.addFields(
                                            { name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
                                            { name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
                                            { name: '\u200B', value: "\u200B", inline: true })
                                    }
                                }
                            }
                            allmessages.get(keysmessages[i]).edit({embeds: [newEmbed]});
                        }
                    }
                break;
            }
                
        }
    }
};