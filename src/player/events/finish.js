const { MessageEmbed} = require("discord.js");
const bot = require("../../../bot");
module.exports = {
    name: 'finish',
	async execute(queue) {
        timeoutID = setTimeout(async() => {
            if (!queue.clientMember.guild.settings.plugins) return
            if (!queue.clientMember.guild.settings.plugins.playerPlugin) return
            if (!queue.clientMember.guild.settings.plugins.playerPlugin.channelId) return
            var playerChannel = await queue.clientMember.guild.channels.resolve(queue.clientMember.guild.settings.plugins.playerPlugin.channelId)
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(bot.lang.get(queue.clientMember.guild.settings.lang).player.embeds.errors["playing"])
            .setThumbnail(``)
            .setURL(``)
            .setDescription(``)
            var allmessages = await playerChannel.messages.fetch()
            let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
            selectedMessage.edit({embeds: [Embedsearch]});	
        }, 30 * 1000)
    }
};