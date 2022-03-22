const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const playerSchema = require('../schemas/player-schema');
const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require("../db/dbdisconnnect");
module.exports = {
	async execute(queue,player) {
        dbconnect()
        var selectGuild = await playerSchema.find({ "_id" : queue.clientMember.guild.id})
        dbdisconnnect()
        if (!selectGuild) {return}
        else {
            var textChannel = selectGuild[0].channelId
            var listchannels = queue.clientMember.guild.channels.cache
            let playerChannel = await listchannels.find(channel => channel.id === textChannel )
            let playlist = player.queues.collection.first().songs;
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Playing: \`${playlist[0].name}\``)
            .setThumbnail(`${playlist[0].thumbnail}`)
            .setURL(`${playlist[0].url}`)
            .setDescription(`Duration: \`${playlist[0].formattedDuration}\`\n`)
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
                .setCustomId(`More commands 🔽`)
                .setLabel("More commands 🔽")
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