const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require('../db/dbdisconnect');
const leave = require('./leave');
const welcome = require('../guild/welcome');
const autoroleSchema = require('../schemas/autorole-schema');

module.exports = {
    async execute(member,add) {
        await member.guild.channels.cache.find(channel => channel.name.includes("Member")).setName(`Member : ${member.guild.memberCount}`)
        await dbconnect()
        var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
        var selectGuildAutorole = await autoroleSchema.find({ "_id" : interaction.guild.id})
        switch (add) {
            case true:
                if (selectGuildWelcomer[0].activeWelcome ==true) {
                    await welcome.execute(member,add,selectGuildWelcomer)
                }
                else {return}
            break;
            case false:
                if (selectGuildWelcomer[0].activeLeave ==true) {
                    await leave.execute(member,add)
                }
                else {return}
            break;
        }
        switch (selectGuildAutorole[0].active) {
            case true:
                if (selectGuildAutorole[0].roleId) {
                    let selRole = member.guild.roles.cache.find(role => role.id === selectGuildAutorole[0].roleId)
                    member.roles.add(selRole)
                }
                break;
        }
        await dbdisconnnect()
        
    }
};