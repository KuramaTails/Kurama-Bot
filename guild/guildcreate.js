const fetchAll = require("../fetch/fetchAll");
const dbconnect = require("../db/dbconnect");
const dbdisconnnect = require("../db/dbdisconnect");
const starttutorial = require("../tutorial/starttutorial");
module.exports = {
    async execute(guild,lang) {
        await dbconnect()
        await fetchAll.execute(guild) 
        console.log("Fetched all!")
        await dbdisconnnect()
        guild.lang = "en"
        await starttutorial.execute(guild,lang)
    }
};
    
    