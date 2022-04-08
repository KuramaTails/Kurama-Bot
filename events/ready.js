const dbconnect = require('../db/dbconnect');
const dbdisconnect = require('../db/dbdisconnect');
const registerpermissions = require('../guild/registerpermissions');
const guildSchema = require('../schemas/guild-schema');

module.exports = {
	name: 'ready',
	once: true,
	async execute(bot) {
        var commands = []
        bot.commands.forEach(element => {
            var command = element.data.toJSON() 
            commands.push(command)
        })
        if (!process.env.DATABASE_TOKEN) {return console.log("Error,no db found")}
        if (!bot.application?.owner) await bot.application?.fetch();
        var guilds= await bot.guilds.fetch()
        var guildsKeys= Array.from(guilds.keys())
        var guildsnames = []
        await dbconnect()
        for (let i = 0; i < guildsKeys.length; i++) {
            var guild = bot.guilds.cache.get(guilds.get(guildsKeys[i]).id)
            var selectGuildlang = await guildSchema.find({ "_id" : guild.id})
            guild.lang= selectGuildlang? selectGuildlang[0].guildLang : "en"
            await registerpermissions.execute(guild,bot.user.id,commands)
            guildsnames.push(guilds.get(guildsKeys[i]).name)
        }
        await dbdisconnect()
        console.log(`Bot joined into ${guildsnames.toString()}`)
    }
};