const welcomer = require("../../welcomer/welcomer");
const bot = require('../../../bot');
module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        try {
            var memberChannel = member.guild.channels.cache.find(channel => channel.name.includes("Member"))
            if (memberChannel) memberChannel.setName(`Member : ${member.guild.memberCount}`)
        } catch (error) {
            console.log(error)
        }
        if (!member.guild.settings.plugins.leaverPlugin) return
        if (!member.guild.settings.plugins.leaverPlugin.active) return
        var add=false
        await welcomer.execute(member,add,bot.lang)
        console.log(`Member leaved from ${member.guild.name}`)
    }
};