const welcomer = require("../../welcomer/welcomer");
const bot = require('../../../bot');
module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        var add=false
        try {
            member.guild.channels.cache.find(channel => channel.name.includes("Member")).setName(`Member : ${member.guild.memberCount}`)
        } catch (error) {
            console.log(error)
        }
        await welcomer.execute(member,add,bot.lang)
        console.log(`Member leaved from ${member.guild.name}`)
    }
};