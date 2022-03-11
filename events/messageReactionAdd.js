const adminEmbed = require("../embeds/adminEmbed");
const helpEmbed = require("../embeds/helpEmbed");
const generalEmbed = require("../embeds/generalEmbed");
const playerEmbed = require("../embeds/playerEmbed");
const helpHome = require("../feature/help");
module.exports = {
    async execute(guild,reaction,user,player) {
        var listchannels = await guild.channels.fetch()
        var selChannel = listchannels.get(reaction.message.channelId)
        switch (selChannel.name) {
            case "choose-role":
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
                                    var selrole = guild.roles.cache.find(role => role.name === roles.get(filteredkeys[i]).name)
                                    var userreacted = await guild.members.fetch(user.id,true);
                                    userreacted.roles.add(selrole);
                                    await userreacted.send(`You have received ${selrole.name} role in ${guild.name}'s Discord.`)
                                }
                            }
                        }
                    }
            break;
            default:
                var allMessages = await selChannel.messages.fetch()
                var selMessage = allMessages.get(reaction.message.id)
                switch (true) {
                    case selMessage.embeds[0].title.includes("Help"):
                        switch (reaction.emoji.name) {
                            case "🔑":
                                await adminEmbed.execute(selMessage)
                            break;
                            case "ℹ":
                                await helpEmbed.execute(selMessage)
                            break;
                            case "⚒":
                                await generalEmbed.execute(selMessage)
                            break;
                            case "🎵":
                                await playerEmbed.execute(selMessage,1)
                            break;
                        }
                    break;
                    case selMessage.embeds[0].title.includes("Admin"):
                        switch (reaction.emoji.name) {
                            case "⬆":
                                await adminEmbed.execute(selMessage,1)
                            break;
                            case "⬇":
                                await adminEmbed.execute(selMessage,2)
                            break;
                            case "⬅":
                                await helpHome.execute(selMessage)
                            break;
                        }
                    break;
                    case selMessage.embeds[0].title.includes("General"):
                        switch (reaction.emoji.name) {
                            case "⬆":
                                await generalEmbed.execute(selMessage,1)
                            break;
                            case "⬇":
                                await generalEmbed.execute(selMessage,2)
                            break;
                            case "⬅":
                                await helpHome.execute(selMessage)
                            break;
                        }
                    break;
                    case selMessage.embeds[0].title.includes("Utility"):
                        switch (reaction.emoji.name) {
                            case "⬆":
                                await helpEmbed.execute(selMessage,1)
                            break;
                            case "⬇":
                                await helpEmbed.execute(selMessage,2)
                            break;
                            case "⬅":
                                await helpHome.execute(selMessage)
                            break;
                        }
                    break;
                    case selMessage.embeds[0].title.includes("Player"):
                        switch (reaction.emoji.name) {
                            case "⬆":
                                await playerEmbed.execute(selMessage,1)
                            break;
                            case "⬇":
                                await playerEmbed.execute(selMessage,2)
                            break;
                            case "⬅":
                                await helpHome.execute(selMessage)
                            break;
                        }
                    break;
                    case selMessage.embeds[0].title.includes("Playing"):
                        switch (reaction.emoji.name) {
                            case "⏮":
                                try {
                                    player.previous(selChannel);
                                    selChannel.send("Playing previous song").then(botMessage => {
                                        setTimeout(() => {
                                            botMessage.delete()
                                        }, 10*1000);
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            break;
                            case "⏯":
                                try {
                                    if (!player.queues.collection.first().paused) {
                                        player.pause(selChannel)
                                        selChannel.send("Player paused").then(botMessage => {
                                            setTimeout(() => {
                                                botMessage.delete()
                                            }, 10*1000);
                                        })
                                    }
                                    else {
                                        player.resume(selChannel)
                                        selChannel.send("Player resumed").then(botMessage => {
                                            setTimeout(() => {
                                                botMessage.delete()
                                            }, 10*1000);
                                        })	
                                    }
                                } catch (error) {
                                    console.log(error)
                                }
                            break;
                            case "⏭":
                                try {
                                    if (player.queues.collection.first().playing) {
                                        if (player.queues.collection.first().songs.length>1) {
                                            player.skip(selChannel)
                                            selChannel.send("Song skipped").then(botMessage => {
                                                setTimeout(() => {
                                                    botMessage.delete()
                                                }, 10*1000);
                                            })
                                        }
                                        else {
                                            player.voices.leave(selChannel)
                                        }
                                    }
                                } catch (error) {
                                    console.log(error)
                                } 
                            break;
                            case "🔀":
                                try {
                                    player.shuffle(selChannel);
                                    selChannel.send("Queue shuffled").then(botMessage => {
                                        setTimeout(() => {
                                            botMessage.delete()
                                        }, 10*1000);
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            break;
                            case "🔁":
                                try {
                                    var queue = player.getQueue(selChannel)
                                    var mode
                                    switch(queue.repeatMode) {
                                        case 0:
                                            player.setRepeatMode(selChannel, 1)
                                            mode = "DISABLED"
                                            selChannel.send("Set repeat mode to `" + mode + "`").then(botMessage => {
                                                setTimeout(() => {
                                                    botMessage.delete()
                                                }, 10*1000);
                                            })
                                            break;
                                        case 1:
                                            player.setRepeatMode(selChannel, 2)
                                            mode = "SONG"
                                            selChannel.send("Set repeat mode to `" + mode + "`").then(botMessage => {
                                                setTimeout(() => {
                                                    botMessage.delete()
                                                }, 10*1000);
                                            })
                                            break;
                                        case 2:
                                            player.setRepeatMode(selChannel, 0)
                                            var mode = "QUEUE"
                                            selChannel.send("Set repeat mode to `" + mode + "`").then(botMessage => {
                                                setTimeout(() => {
                                                    botMessage.delete()
                                                }, 10*1000);
                                            })
                                            break;
                                    }                                    
                                    break;
                                } catch (error) {
                                    console.log(error)
                                }
                                
                            break;
                            case "🔉":
                                try {
                                    var queue = player.getQueue(selChannel)
                                    var volume = queue.volume
                                    player.setVolume(selChannel, volume-10);
                                    selChannel.send("Set volume to `" + volume + "`").then(botMessage => {
                                        setTimeout(() => {
                                            botMessage.delete()
                                        }, 10*1000);
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            break;
                            case "🔊":
                                try {
                                    var queue = player.getQueue(selChannel)
                                    var volume = queue.volume
                                    player.setVolume(selChannel, volume+10);
                                    selChannel.send("Set volume to `" + volume + "`").then(botMessage => {
                                        setTimeout(() => {
                                            botMessage.delete()
                                        }, 10*1000);
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            break;
                        }
                    break;
                }
            break;
        }	
    }
};
   

