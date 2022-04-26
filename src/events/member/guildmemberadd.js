const welcomer = require("../../welcomer/welcomer");
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
        await welcomer.execute(member,add,bot.lang)
        if (member.guild.settings.autorolePlugin.active && member.guild.settings.autorolePlugin.role != undefined) {
            let selRole = member.guild.roles.cache.find(role => role.id === selectGuildAutorole[0].roleId)
            member.roles.add(selRole)
        }
        console.log(`Member joined in ${member.guild.name}`)
    }
};