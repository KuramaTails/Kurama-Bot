const { MessageEmbed } = require("discord.js");
module.exports = {
    async execute(guild,twitch) {
        var twitchPlugin = guild.settings.plugins.twitchPlugin
        for (const channel of twitchPlugin.streamerList) {
            var query = await twitch.searchChannels({ query: channel.broadcaster_login })
            var found = query.data.find(nchannel => nchannel.broadcaster_login == channel.broadcaster_login)
            if (!found) return
            if (found.is_live == true && found.is_live != channel.alreadySend) {
                found.alreadySend = found.is_live
                var foundIndex = twitchPlugin.streamerList.findIndex(lchannel => lchannel.broadcaster_login == channel.broadcaster_login);
                twitchPlugin.streamerList[foundIndex] = found;
                return sendEmbed(guild,found)
            }
        }
        async function sendEmbed(guild,found) {
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