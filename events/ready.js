const dbconnect = require('../db/dbconnect');
const dbdisconnect = require('../db/dbdisconnect');
const registerpermissions = require('../guild/registerpermissions');
module.exports = {
	async execute(bot,commands) {
        if (!process.env.DATABASE_TOKEN) {return console.log("Error,no db found")}
        if (!bot.application?.owner) await bot.application?.fetch();
        var guilds= await bot.guilds.fetch()
        var guildsKeys= Array.from(guilds.keys())
        var botId = bot.user.id
        var guildsnames = []
        await dbconnect()
        for (let i = 0; i < guildsKeys.length; i++) {
            var guild = bot.guilds.cache.get(guilds.get(guildsKeys[i]).id)
            await registerpermissions.execute(guild,botId,commands)
            guildsnames.push(guilds.get(guildsKeys[i]).name)
        }
        await dbdisconnect()
        console.log(`Bot joined into ${guildsnames.toString()}`)
    }
};