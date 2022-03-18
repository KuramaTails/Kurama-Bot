const createserverstats = require("../layout/createserverstats")
const createwelcomechannel = require("../layout/createwelcomechannels")
const createplayerchannels = require("../layout/createplayerchannels");
module.exports = {
    async execute(guild) {
        var listChannels = await guild.channels.fetch()
        let selChannel = await listChannels.find(channel => channel.type.includes("GUILD_TEXT"))
        selChannel.send("Hi! I've just joined your channel. Please check the newly created channels").then(async msg => {
            await createserverstats.execute(msg);
            console.log(`Created server stats in ${guild.name}`)
            setTimeout( async () => {
                await createwelcomechannel.execute(msg);
                console.log(`Created welcome rooms in ${guild.name}`) 
            }, 5000);
            setTimeout(async () => {
                await createplayerchannels.execute(msg);
                console.log(`Created player rooms in ${guild.name}`)
            }, 17000);
            return
            })
        return
    }
};
    
    