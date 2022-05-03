const { MessageEmbed } = require("discord.js");
const guildSchema = require("../../schemas/guild-schema");
module.exports = {
    async execute(guild,twitch) {
        var twitchPlugin = guild.settings.plugins.twitchPlugin
        for (const channel of twitchPlugin.streamerList) {
            var query = await twitch.searchChannels({ query: channel.broadcaster_login })
            var found = query.data.find(nchannel => nchannel.broadcaster_login == channel.broadcaster_login)
            if (!found) return
            if (found.is_live == true && found.is_live != channel.alreadySend) return sendEmbed(guild,channel,found,guildSchema)
        }
        async function sendEmbed(guild,channel,found) {
            channel = found
            channel.alreadySend = channel.is_live
            var textChannel = guild.channels.cache.get(guild.settings.plugins.twitchPlugin.channelId)
            var thumbnail = found.thumbnail_url.replace("-{width}x{height}","")
            const streamingEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(found.broadcaster_login+" is live right now")
            .setURL("https://twitch.tv/"+found.broadcaster_login)
            .setDescription(found.title)
            .setImage(thumbnail)
            textChannel.send({embeds:[streamingEmbed]})
        }
	}
};