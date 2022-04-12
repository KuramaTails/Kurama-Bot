const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const playerSchema = require('../../schemas/player-schema');
const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnect = require("../../misc/db/dbdisconnect");
const bot = require("../../../bot");
module.exports = {
    name: 'playSong',
	async execute(queue) {
        clearTimeout(bot.timeoutID)
	    bot.timeoutID = undefined	
        await dbconnect()
        var selectGuild = await playerSchema.find({ "_id" : queue.clientMember.guild.id})
        await dbdisconnect()
        if (!selectGuild) {return}
        else {
            var textChannel = selectGuild[0].channelId
            var listchannels = queue.clientMember.guild.channels.cache
            let playerChannel = await listchannels.find(channel => channel.id === textChannel )
            let playlist = bot.player.queues.collection.first().songs;
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(bot.lang.get(queue.clientMember.guild.lang).commands.player.embeds["playing"]+`: \`${playlist[0].name}\``)
            .setThumbnail(`${playlist[0].thumbnail}`)
            .setURL(`${playlist[0].url}`)
            .setDescription(bot.lang.get(queue.clientMember.guild.lang).commands.player.embeds["duration"]+`: \`${playlist[0].formattedDuration}\`\n`)
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
                .setLabel(bot.lang.get(queue.clientMember.guild.lang).buttons.buttons["btnMoreCommand"]+"🔽")
                .setStyle(`SECONDARY`),);
            var allmessages = await playerChannel.messages.fetch()
            let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
            if (selectedMessage) {
                selectedMessage.edit({embeds: [Embedsearch]});
                return
            }
            playerChannel.send({embeds: [Embedsearch],components:[buttons1,moreButton]}) 
        }
    }
};