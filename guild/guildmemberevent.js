const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require('../db/dbdisconnect');
const fetchmembers = require('../fetch/fetchmembers');
const leave = require('./leave');
const welcome = require('../guild/welcome');

module.exports = {
    async execute(member,add) {
        var db= await dbconnect()
        await member.guild.channels.cache.find(channel => channel.name.includes("Member")).setName(`Member : ${member.guild.memberCount}`)
        if (db.connection.readyState === 1) {
            await fetchmembers.execute(member.guild)
            if (add==true) {
                await welcome.execute(member,add)
            }
            else {
                await leave.execute(member,add)
            }
        }
        await dbdisconnnect()
        
    }
};