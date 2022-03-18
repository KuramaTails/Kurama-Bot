module.exports = {
    async execute(oldMember,cooldownPresence) {
        try {
            cooldownPresence.set(oldMember.guild.id, true);
            let members = oldMember.guild.members.cache
            let memberskeys = Array.from(members.keys())
            var memberCount = memberskeys.length
            let onlineMembers = []
            let offlineMembers = []
            for (let i = 0; i < memberskeys.length; i++) {
                try {
                    switch (members.get(memberskeys[i]).presence.status) {
                        case "online":
                            onlineMembers.push(members.get(memberskeys[i]))
                        break;
                        case "idle":
                            onlineMembers.push(members.get(memberskeys[i]))
                        break;    
                        case "dnd":
                            onlineMembers.push(members.get(memberskeys[i]))
                        break;    
                        case "offline":
                            offlineMembers.push(members.get(memberskeys[i]))
                        break;
                    }
                } catch (error) {
                    offlineMembers.push(members.get(memberskeys[i]))
                }
            }
            var oldOnlineMembers = onlineMembers.length
            var oldOfflineMembers = offlineMembers.lengthù
            try {
                if (oldMember.status=="online"){
                    oldOnlineMembers=oldOnlineMembers+1
                    oldOfflineMembers=oldOfflineMembers-1
                }
                else {
                    oldOnlineMembers=oldOnlineMembers-1
                    oldOfflineMembers=oldOfflineMembers+1
                }
            } catch (error) {
                console.log(error)
            }
            try {
                var listchannels = oldMember.guild.channels.cache
                let memberChannel = await listchannels.find(channel => channel.name.includes("Member"))
                let onlineChannel = await listchannels.find(channel => channel.name.includes("Online"))
                let offlineChannel = await listchannels.find(channel => channel.name.includes("Offline"))
                memberChannel.setName(`Member : ${memberCount}`)
                onlineChannel.setName(`Online : ${onlineMembers.length}`)
                offlineChannel.setName(`Offline : ${offlineMembers.length}`)
            } catch (error) {
                console.log(error)
            }
            console.log(`Presence updated in ${oldMember.guild}`)
            setTimeout(() => {
                cooldownPresence.delete(oldMember.guild.id);
            }, 5*60*1000);
        } catch (error) {
            console.log(error)
        }
    }
};
   