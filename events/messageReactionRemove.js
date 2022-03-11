module.exports = {
    async execute(guild,reaction) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            if (listchannels.get(keyschannels[i]).id == reaction.message.channelId)
            {
                if (listchannels.get(keyschannels[i]).name!= "choose-role") {return}			
                var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
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
                for (let i = 0; i < filteredkeys.length; i++) {
                    if (!roles.get(filteredkeys[i]).managed ){
                        if (roles.get(filteredkeys[i]).name != "@everyone"){
                            roles.get(filteredkeys[i]).emoji = emojilist[i]
                            if (roles.get(filteredkeys[i]).emoji == reaction.emoji.name)
                            {
                                if (user.id != bot.user.id) {
                                    var selrole = guild.roles.cache.find(role => role.name === roles.get(filteredkeys[i]).name)
                                    var userreacted = await guild.members.fetch(user.id,true);
                                    userreacted.roles.remove(selrole);
                                    await userreacted.send(`You have removed ${selrole.name} role in ${guild.name}'s Discord.`)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
   
