const fetchAll = require("../fetch/fetchAll");
const dbconnect = require("../db/dbconnect");
const dbdisconnnect = require("../db/dbdisconnnect");
const createembedroles = require("../layout/createembedroles");
const createplayerembed = require("../layout/createplayerembed");
const createbases = require("../layout/createbases");
const tutorial = require("../tutorial/tutorial");
module.exports = {
    async execute(guild) {
        await dbconnect()
        await fetchAll.execute(guild) 
        console.log("Fetched all!")
        await dbdisconnnect()
        await tutorial.execute(guild)
        /*var db= await dbconnect()
        await createbases.execute(guild)
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
        }, 10000);*/
    }
};
    
    