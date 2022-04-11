const { MessageEmbed} = require("discord.js");
const playerSchema = require('../schemas/player-schema');
const dbconnect = require('../db/dbconnect');
const dbdisconnect = require("../db/dbdisconnect");
const bot = require("../bot");
module.exports = {
    name: 'finish',
	async execute(queue) {
        timeoutID = setTimeout(async() => {
            await dbconnect()
            var selectGuild = await playerSchema.find({ "_id" : queue.clientMember.guild.id})
            await dbdisconnect()
            if (!selectGuild) {return}
            else {
                var textChannel = selectGuild[9].channelId
                var listchannels = queue.clientMember.guild.channels.cache
                let playerChannel = await listchannels.find(channel => channel.id === textChannel )
                const Embedsearch = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(bot.lang.get(queue.clientMember.guild.lang).commands.player.embeds.errors["playing"])
                .setThumbnail(``)
                .setURL(``)
                .setDescription(``)
                var allmessages = await playerChannel.messages.fetch()
                let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
                selectedMessage.edit({embeds: [Embedsearch]});	
            }
        }, 30 * 1000)
    }
};