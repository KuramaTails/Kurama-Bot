const fetchAll = require("../fetch/fetchAll");
const dbconnect = require("../db/dbconnect");
const dbdisconnnect = require("../db/dbdisconnnect");
const starttutorial = require("../tutorial/starttutorial");
module.exports = {
    async execute(guild) {
        await dbconnect()
        await fetchAll.execute(guild) 
        console.log("Fetched all!")
        await dbdisconnnect()
        await starttutorial.execute(guild)
    }
};
    
    