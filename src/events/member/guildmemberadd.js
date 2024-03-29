const welcomer = require("../../welcomer/welcomer");
const bot = require("../../../bot");
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        if (member.user.id == bot.client.application.id) return
        try {
            var memberChannel = member.guild.channels.cache.find(channel => channel.name.includes("Member"))
            if (memberChannel) memberChannel.setName(`Member : ${member.guild.memberCount}`)
        } catch (error) {
            console.log(error)
        }
        if (!member.guild.settings.plugins.welcomerPlugin) return
        if (!member.guild.settings.plugins.welcomerPlugin.active) return
        var add=true
        await welcomer.execute(member,add,bot.lang)
        if (!member.guild.settings.plugins.autorolePlugin.active) return
        if (!member.guild.settings.plugins.autorolePlugin.role) return
        var roleId = member.guild.settings.plugins.autorolePlugin.role
        let selRole = member.guild.roles.cache.find(role => role.id === roleId)
        try {
            await member.roles.add(selRole)
        } catch (error) {
            console.log(error)
        } 
        console.log(`Member joined in ${member.guild.name}`)
    }
};