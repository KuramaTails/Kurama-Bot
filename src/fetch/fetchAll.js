const dbconnect = require('../misc/db/dbconnect');
const dbdisconnnect = require('../misc/db/dbdisconnect');
const fetchchannels = require('./fetchchannels');
const fetchguild = require('./fetchguild');
const fetchmembers = require('./fetchmembers');
const fetchroles = require('./fetchroles');



module.exports = {
    async execute(guild) {
        try {
            await dbconnect();
            await fetchguild.execute(guild)
            await fetchmembers.execute(guild)
            await fetchchannels.execute(guild)
            await fetchroles.execute(guild)
            await dbdisconnnect()
        } catch (error) {
          console.log(error)  
        }
    }
};
