const createserverstats = require("../layout/createserverstats")
const createwelcomechannel = require("../layout/createwelcomechannel")
const createplayerchannels = require("../layout/createplayerchannels");
const createbasicroles = require("../layout/createbasicroles");
module.exports = {
    async execute(guild) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            if (listchannels.get(keyschannels[i]).type== "GUILD_TEXT"){
                listchannels.get(keyschannels[i]).send("Hi! I've just joined your channel. Please check the newly created channels").then(async msg => {
                    await createserverstats.execute(msg);
                    await createwelcomechannel.execute(msg);
                    await createplayerchannels.execute(msg);
                    await createbasicroles.execute(msg);
                    return })
                    return
            }
        }	
    }
};
    
    