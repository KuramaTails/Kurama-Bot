module.exports = {
    async execute(message,spamList) {
        var userId = message.author.id
        if (!message.guild.members.cache.get(userId).permissions.has("ADMINISTRATOR")) {
            spamList.get(userId)? 
            (spamList.set(userId,spamList.get(userId)+1),spamList.get(userId)==10? (message.guild.members.cache.get(userId).timeout(5 * 60 * 1000),message.channel.send("Hey! You have been timeoutted for 5 minutes,stop spamming or this will increase next time.")) : (spamList.get(userId)==5? message.channel.send("Hey! This is a warning,stop spamming.") : "")) : (spamList.set(userId,1),setTimeout(() => {spamList.clear(userId)}, 10000))    
        }
    }
};