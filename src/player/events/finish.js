const { MessageEmbed} = require("discord.js");
const bot = require("../../../bot");
const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");
module.exports = {
    name: 'finish',
	async execute(queue) {
        timeoutID = setTimeout(async() => {
            var settings = queue.clientMember.guild.settings
            if (!settings.plugins) return
            if (!settings.plugins.playerPlugin) return
            if (!settings.plugins.playerPlugin.channelId) return
            var playerChannel = await queue.clientMember.guild.channels.resolve(settings.plugins.playerPlugin.channelId)
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(bot.lang.get(settings.lang).player.embeds.errors["playing"])
            .setThumbnail(``)
            .setURL(``)
            .setDescription(``)
            var allmessages = await playerChannel.messages.fetch()
            let selectedMessage = await allmessages.find(message => message.embeds.length > 0)
            selectedMessage.edit({embeds: [Embedsearch]});
            var vol = queue.volume
            settings.plugins.playerPlugin.volume = vol
            await dbconnect()
            await guildSchema.findOneAndUpdate({
                _id: queue.clientMember.guild.id,
            }, {
                $set: {
                    "plugins.playerPlugin.volume":  vol,
                }
            },
            {
                upsert:true,
            })
            await dbdisconnect()
            await queue.distube.voices.leave(queue.voiceChannel)
        }, 30 * 1000)
    }
};