module.exports = {
    async execute(oldMember) {
        try {
            let members = oldMember.guild.members.cache
            let memberskeys = Array.from(members.keys())
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
            var memberCount = oldMember.guild.memberCount
            var listchannels = oldMember.guild.channels.cache
            var keyschannels = Array.from(listchannels.keys())
            for (let i = 0; i < keyschannels.length; i++) {
                switch (true) {
                    case listchannels.get(keyschannels[i]).name.includes("Member"):
                    listchannels.get(keyschannels[i]).setName(`Member : ${memberCount}`)
                    console.log(`Member : ${memberCount}`)
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Online"):
                    listchannels.get(keyschannels[i]).setName(`Online : ${onlineMembers.length}`)
                    console.log(`Online : ${onlineMembers.length}`)
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Offline"):
                    listchannels.get(keyschannels[i]).setName(`Offline : ${offlineMembers.length}`)
                    console.log(`Offline : ${offlineMembers.length}`)
                    break;
                }	
            }
            console.log(`Presence updated in ${oldMember.guild}`)
        } catch (error) {
            console.log(error)
        }
    }
};
   