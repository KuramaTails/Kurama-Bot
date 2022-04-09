const dbconnect = require('../db/dbconnect');
const dbdisconnect = require('../db/dbdisconnect');
const registerpermissions = require('../guild/registerpermissions');
const guildSchema = require('../schemas/guild-schema');
const bot = require("../bot");

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
        if (!process.env.DATABASE_TOKEN) {return console.log("Error,no db found")}
        if (!bot.client.application?.owner) await bot.client.application?.fetch();
        var guilds= await bot.client.guilds.fetch()
        var guildsKeys= Array.from(guilds.keys())
        var guildsnames = []
        await dbconnect()
        for (let i = 0; i < guildsKeys.length; i++) {
            var guild = bot.client.guilds.cache.get(guilds.get(guildsKeys[i]).id)
            var selectGuildlang = await guildSchema.find({ "_id" : guild.id})
            guild.lang= selectGuildlang? selectGuildlang[0].guildLang : "en"
            await registerpermissions.execute(guild,bot.client.user.id,bot.listCommands)
            guildsnames.push(guilds.get(guildsKeys[i]).name)
        }
        await dbdisconnect()
        console.log(`Bot joined into ${guildsnames.toString()}`)
    }
};