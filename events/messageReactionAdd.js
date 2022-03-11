const adminEmbed = require("../embeds/adminEmbed");
const helpEmbed = require("../embeds/helpEmbed");
const generalEmbed = require("../embeds/generalEmbed");
const playerEmbed = require("../embeds/playerEmbed");
const helpHome = require("../feature/help");
module.exports = {
    async execute(guild,reaction,player) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            if (listchannels.get(keyschannels[i]).id == reaction.message.channelId)
            {	
                switch (listchannels.get(keyschannels[i]).name) {
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
                }
                var textchannel = listchannels.get(keyschannels[i])
                var selchannel = await listchannels.get(keyschannels[i]).messages.fetch()
                var keysMessages= Array.from( selchannel.keys() );
                for (let i = 0; i < keysMessages.length; i++) {
                    if (reaction.message.id == selchannel.get(keysMessages[i]).id) {
                        switch (true) {
                            case selchannel.get(keysMessages[i]).embeds[0].title.includes("Help"):
                                switch (reaction.emoji.name) {
                                    case "🔑":
                                        await adminEmbed.execute(selchannel.get(keysMessages[i]))
                                    break;
                                    case "ℹ":
                                        await helpEmbed.execute(selchannel.get(keysMessages[i]))
                                    break;
                                    case "⚒":
                                        await generalEmbed.execute(selchannel.get(keysMessages[i]))
                                    break;
                                    case "🎵":
                                        await playerEmbed.execute(selchannel.get(keysMessages[i]),1)
                                    break;
                                }
                            break;
                            case selchannel.get(keysMessages[i]).embeds[0].title.includes("Admin"):
                                switch (reaction.emoji.name) {
                                    case "⬆":
                                        await adminEmbed.execute(selchannel.get(keysMessages[i]),1)
                                    break;
                                    case "⬇":
                                        await adminEmbed.execute(selchannel.get(keysMessages[i]),2)
                                    break;
                                    case "⬅":
                                        await helpHome.execute(selchannel.get(keysMessages[i]))
                                    break;
                                }
                            break;
                            case selchannel.get(keysMessages[i]).embeds[0].title.includes("General"):
                                switch (reaction.emoji.name) {
                                    case "⬆":
                                        await generalEmbed.execute(selchannel.get(keysMessages[i]),1)
                                    break;
                                    case "⬇":
                                        await generalEmbed.execute(selchannel.get(keysMessages[i]),2)
                                    break;
                                    case "⬅":
                                        await helpHome.execute(selchannel.get(keysMessages[i]))
                                    break;
                                }
                            break;
                            case selchannel.get(keysMessages[i]).embeds[0].title.includes("Utility"):
                                switch (reaction.emoji.name) {
                                    case "⬆":
                                        await helpEmbed.execute(selchannel.get(keysMessages[i]),1)
                                    break;
                                    case "⬇":
                                        await helpEmbed.execute(selchannel.get(keysMessages[i]),2)
                                    break;
                                    case "⬅":
                                        await helpHome.execute(selchannel.get(keysMessages[i]))
                                    break;
                                }
                            break;
                            case selchannel.get(keysMessages[i]).embeds[0].title.includes("Player"):
                                switch (reaction.emoji.name) {
                                    case "⬆":
                                        await playerEmbed.execute(selchannel.get(keysMessages[i]),1)
                                    break;
                                    case "⬇":
                                        await playerEmbed.execute(selchannel.get(keysMessages[i]),2)
                                    break;
                                    case "⬅":
                                        await helpHome.execute(selchannel.get(keysMessages[i]))
                                    break;
                                }
                            break;
                            case selchannel.get(keysMessages[i]).embeds[0].title.includes("Playing"):
                                switch (reaction.emoji.name) {
                                    case "⏮":
                                        //no previous
                                    break;
                                    case "⏯":
                                        try {
                                            if (!player.queues.collection.first().paused) {
                                                player.pause(textchannel)
                                                textchannel.send("Player paused")	
                                            }
                                            else {
                                                player.resume(textchannel)
                                                textchannel.send("Player resumed")	
                                            }
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    break;
                                    case "⏭":
                                        try {
                                            if (player.queues.collection.first().playing) {
                                                if (player.queues.collection.first().songs.length>1) {
                                                    player.skip(textchannel)
                                                    textchannel.send("Song skipped")
                                                }
                                                else {
                                                    player.voices.leave(textchannel)
                                                }
                                            }
                                        } catch (error) {
                                            console.log(error)
                                        } 
                                    break;
                                    case "🔀":
                                        //still no shuffle
                                    break;
                                    case "🔁":
                                        //mode problem
                                    break;
                                    case "🔉":
                                        //no audio var
                                    break;
                                    case "🔊":
                                        //no audio var
                                    break;
                                }
                            break;
                        }
                    }
                }
            }
        }	
    }
};
   

