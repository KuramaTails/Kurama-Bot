module.exports = {
    async execute(newMember,cooldownPresence) {
        try {
            cooldownPresence.set(newMember.guild.id, true);
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
            console.log("Presence Updated")
        } catch(error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                console.log("Deleted cooldown")
                cooldownPresence.delete(newMember.guild.id);
            }, 5*1000);
        }
    }
};
   