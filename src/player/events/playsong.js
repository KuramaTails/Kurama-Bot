const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const bot = require("../../../bot");
module.exports = {
    name: 'playSong',
	async execute(queue) {
        clearTimeout(bot.timeoutID)
	    bot.timeoutID = undefined	
        if (!queue.clientMember.guild.settings.plugins) return
        if (!queue.clientMember.guild.settings.plugins.playerPlugin) return
        if (!queue.clientMember.guild.settings.plugins.playerPlugin.channelId) return
        var channels = await queue.clientMember.guild.channels.fetch()
        console.log(queue.clientMember.guild.settings.plugins.playerPlugin.channelId)
        let playerChannel = await channels.find(channel => channel.id == queue.clientMember.guild.settings.plugins.playerPlugin.channelId)
        console.log(playerChannel)
        if (!playerChannel) return
        let playlist = bot.player.queues.collection.first().songs;
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(bot.lang.get(queue.clientMember.guild.settings.lang).player.embeds["playing"]+`: \`${playlist[0].name}\``)
        .setThumbnail(`${playlist[0].thumbnail}`)
        .setURL(`${playlist[0].url}`)
        .setDescription(bot.lang.get(queue.clientMember.guild.settings.lang).player.embeds["duration"]+`: \`${playlist[0].formattedDuration}\`\n`)
        const buttons1 = new MessageActionRow()
        const moreButton = new MessageActionRow()
        buttons1.addComponents(
            new MessageButton()
            .setCustomId(`Join`)
            .setLabel("✅")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`Previous`)
            .setLabel(`⏮`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`(Un)Pause`)
            .setLabel(`⏯`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`Next`)
            .setLabel(`⏭`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`Leave`)
            .setLabel("❌")
            .setStyle(`DANGER`),
        );
        moreButton.addComponents(
            new MessageButton()
            .setCustomId("player-morecommands")
            .setLabel(bot.lang.get(queue.clientMember.guild.settings.lang).player.buttons["btnMoreCommand"]+"🔽")
            .setStyle(`SECONDARY`),);
        var allmessages = await playerChannel.messages.fetch()
        let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
        if (selectedMessage) {
            selectedMessage.edit({embeds: [Embedsearch]});
            return
        }
        playerChannel.send({embeds: [Embedsearch],components:[buttons1,moreButton]}) 
    }
};