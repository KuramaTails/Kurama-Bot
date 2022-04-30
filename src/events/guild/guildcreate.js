const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const fetchAll = require("../../fetch/fetchAll");
const starttutorial = require("../../tutorial/embeds/starttutorial");
const bot = require("../../../bot");
const registerpermissions = require("./registerpermissions");

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        await dbconnect()
        guild.settings = {
            lang: "en",
            plugins: undefined
        }
        await registerpermissions.execute(guild,bot.client.user.id,bot.commands)
        await fetchAll.execute(guild) 
        console.log("Fetched all!")
        await dbdisconnect()
        guild.lang = "en"
        await starttutorial.execute(guild,bot.lang)
        console.log("Joined a new guild: " + guild.name);
    }
};