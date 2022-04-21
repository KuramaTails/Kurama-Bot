const welcomer = require("../../welcomer/welcomer");
const autoroleSchema = require("../../schemas/autorole-schema");
const welcomeSchema = require("../../schemas/welcome-schema");
const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnnect = require('../../misc/db/dbdisconnect');
const bot = require("../../../bot");
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        var add=true
        try {
            member.guild.channels.cache.find(channel => channel.name.includes("Member")).setName(`Member : ${member.guild.memberCount}`)
        } catch (error) {
            console.log(error)
        }
        try {
            await dbconnect()
            var selectGuildWelcomer = await welcomeSchema.find({ "_id" : member.guild.id})
            var selectGuildAutorole = await autoroleSchema.find({ "_id" : member.guild.id})
            await welcomer.execute(member,add,selectGuildWelcomer,bot.lang)
            switch (selectGuildAutorole[0].active) {
                case true:
                    if (selectGuildAutorole[0].roleId) {
                        let selRole = member.guild.roles.cache.find(role => role.id === selectGuildAutorole[0].roleId)
                        member.roles.add(selRole)
                    }
                    break;
            }
            await dbdisconnnect()
        } catch (error) {
            console.log(error)
        }
        
        console.log(`Member joined in ${member.guild.name}`)
    }
};