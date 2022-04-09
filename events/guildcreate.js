const dbconnect = require("../db/dbconnect");
const dbdisconnect = require("../db/dbdisconnect");
const fetchAll = require("../fetch/fetchAll");
const registerpermissions = require("../guild/registerpermissions");
const starttutorial = require("../tutorial/starttutorial");

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        await registerpermissions.execute(guild,bot.client.user.id,bot.listCommands)
        await dbconnect()
        await fetchAll.execute(guild) 
        console.log("Fetched all!")
        await dbdisconnect()
        guild.lang = "en"
        await starttutorial.execute(guild,bot.lang)
        console.log("Joined a new guild: " + guild.name);
    }
};