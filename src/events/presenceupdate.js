const bot = require("../../bot");

module.exports = {
    name: 'presenceUpdate',
	async execute(oldMember,newMember) {
        if (oldMember=== null) { return}
        if(oldMember.status == newMember.status) {return}
        if (bot.cooldownPresence.has(newMember.guild.id)) {return}
        try {
            bot.cooldownPresence.set(newMember.guild.id, true);
            let onlineChannel = await newMember.guild.channels.cache.find(channel => channel.name.includes("Online"))
            let offlineChannel = await newMember.guild.channels.cache.find(channel => channel.name.includes("Offline"))
            var members = newMember.guild.members.cache
            var memberKeys = Array.from(members.keys())
            var onlineCount = 0
            var offlineCount = 0
            for (let i = 0; i < memberKeys.length; i++) {
                try {
                    switch (members.get(memberKeys[i]).presence.status) {
                        case "online":
                            onlineCount=onlineCount+1
                        break;
                        case "idle":
                            onlineCount=onlineCount+1
                        break;
                        case "dnd":
                            onlineCount=onlineCount+1
                        break;
                        case "offline":
                            offlineCount=offlineCount+1
                        break;
    
                    }
                } catch (error) {
                    offlineCount=offlineCount+1 
                }
                
            }
            onlineChannel.setName(`Online : ${onlineCount}`)
            offlineChannel.setName(`Offline : ${offlineCount}`)
            console.log(`Presence Updated in ${newMember.guild.name}`)
        } catch(error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                console.log("Deleted cooldown")
                bot.cooldownPresence.delete(newMember.guild.id);
            }, 5*60*1000);
        }
	}
};