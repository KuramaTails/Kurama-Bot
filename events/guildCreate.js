const createserverstats = require("../layout/createserverstats")
const createwelcomechannel = require("../layout/createwelcomechannel")
const createplayerchannels = require("../layout/createplayerchannels");
const createbasicroles = require("../layout/createbasicroles");
const createEmbedRole = require("../layout/createEmbedRole")
module.exports = {
    async execute(guild) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            if (listchannels.get(keyschannels[i]).type== "GUILD_TEXT"){
                listchannels.get(keyschannels[i]).send("Hi! I've just joined your channel. Please check the newly created channels").then(async msg => {
                    await createserverstats.execute(msg);
                    console.log(`Created server stats in ${guild.name}`)
                    await createwelcomechannel.execute(msg);
                    console.log(`Created welcome rooms in ${guild.name}`)
                    await createplayerchannels.execute(msg);
                    console.log(`Created player rooms in ${guild.name}`)
                    await createbasicroles.execute(msg);
                        console.log(`Created roles in ${guild.name}`)
                    setTimeout( async() => {
                        createEmbedRole.execute(guild)
                    }, 10*1000);
                    return })
                    return
            }
        }
    }
};
    
    