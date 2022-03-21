const createserverstats = require("../layout/createserverstats")
const createwelcomechannel = require("../layout/createwelcomechannels")
const createplayerchannels = require("../layout/createplayerchannels");
const fetchAll = require("../fetch/fetchAll");
const dbconnect = require("../db/dbconnect");
const dbdisconnnect = require("../db/dbdisconnnect");
const channelsSchema = require("../schemas/channels-schema");
const createembedroles = require("../layout/createembedroles");
const createbasicroles = require("../layout/createbasicroles");
const createplayerembed = require("../layout/createplayerembed");
module.exports = {
    async execute(guild) {
        var db= await dbconnect()
        let selectedChannel = await guild.channels.cache.find(c => c.type === "GUILD_TEXT");
        await selectedChannel.send("Hi! I've just joined your channel. Please check the newly created channels")
        await createserverstats.execute(guild)
        console.log(`Created server stats in ${guild.name}`)
        await createwelcomechannel.execute(guild);
        console.log(`Created welcome rooms in ${guild.name}`)
        await createbasicroles.execute(guild);
        console.log(`Created roles in ${guild.name}`)
        await createplayerchannels.execute(guild);
        console.log(`Created player rooms in ${guild.name}`)
        setTimeout(async () => {
            if (db.connection.readyState === 1) {
                await dbdisconnnect()
                await fetchAll.execute(guild) 
                console.log("Fetched all!")
            }
            else {
                await fetchAll.execute(guild) 
                console.log("Fetched all!")
            }
        }, 5000);
        setTimeout( async() => {
            if (db.connection.readyState === 1) {
                await createembedroles.execute(guild)
                console.log(`Created rolesEmbed in ${guild.name}`)
                await createplayerembed.execute(guild)
                console.log(`Created playerEmbed in ${guild.name}`)
               }
            else {
                await dbconnect()
                await createembedroles.execute(guild)
                console.log(`Created rolesEmbed in ${guild.name}`)
                await createplayerembed.execute(guild)
                console.log(`Created playerEmbed in ${guild.name}`)
                await dbdisconnnect()
            }
        }, 10000);
        if (db.connection.readyState === 1) {
            await dbdisconnnect()
        }
    }
};
    
    