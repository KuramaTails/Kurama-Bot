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
        await fetchAll.execute(guild)
        var db = await dbconnect() 
        var selectGuild = await channelsSchema.find({ "_id" : guild.id})
		var keysChannels = Array.from(selectGuild[0].channels.keys())
		var listTextChannels = []
		for (let i = 0; i < keysChannels.length; i++) {
			if (selectGuild[0].channels.get(keysChannels[i]).type == "GUILD_TEXT") {
				listTextChannels.push(keysChannels[i])
			}
		}
        var selectedChannel = await guild.channels.resolve(listTextChannels[0])
        await selectedChannel.send("Hi! I've just joined your channel. Please check the newly created channels")
        await createserverstats.execute(guild)
        console.log(`Created server stats in ${guild.name}`)
        setTimeout(async () => {
            await createwelcomechannel.execute(guild);
            console.log(`Created welcome rooms in ${guild.name}`)
        }, 5000);
        setTimeout( async() => {
            if (db.connection.readyState === 1) {
                await createembedroles.execute(guild)
                console.log(`Created rolesEmbed in ${guild.name}`)
               }
        }, 10000);
        setTimeout(async () => {
            await createbasicroles.execute(guild);
            console.log(`Created roles in ${guild.name}`)
        }, 15000);
        setTimeout(async () => {
            await createplayerchannels.execute(guild);
            console.log(`Created player rooms in ${guild.name}`)
        }, 20000);
        setTimeout(async () => {
            await createplayerembed.execute(guild)
            console.log(`Created playerEmbed in ${guild.name}`)
        }, 25000);
        await dbdisconnnect()
    }
};
    
    