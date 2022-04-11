const dbconnect = require("../misc/db/dbconnect");
const dbdisconnect = require("../misc/db/dbdisconnect");
const fetchAll = require("../fetch/fetchAll");
const registerpermissions = require("../misc/registerpermissions");
const starttutorial = require("../tutorial/starttutorial");
const bot = require("../../bot");

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