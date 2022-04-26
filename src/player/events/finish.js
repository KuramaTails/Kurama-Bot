const { MessageEmbed} = require("discord.js");
const bot = require("../../../bot");
module.exports = {
    name: 'finish',
	async execute(queue) {
        timeoutID = setTimeout(async() => {
            if (!queue.clientMember.guild.settings.playerPlugin.channelId) return
            var textChannel = queue.clientMember.guild.settings.playerPlugin.channelId
            var listchannels = queue.clientMember.guild.channels.cache
            let playerChannel = await listchannels.find(channel => channel.id === textChannel )
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(bot.lang.get(queue.clientMember.guild.settings.lang).commands.player.embeds.errors["playing"])
            .setThumbnail(``)
            .setURL(``)
            .setDescription(``)
            var allmessages = await playerChannel.messages.fetch()
            let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
            selectedMessage.edit({embeds: [Embedsearch]});	
        }, 30 * 1000)
    }
};