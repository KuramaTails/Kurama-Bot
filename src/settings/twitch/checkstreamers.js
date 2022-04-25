const { MessageEmbed } = require("discord.js");

module.exports = {
    async execute(guild,twitch) {
        var twitchPlugin = guild.settings.twitchPlugin
        for (const channel of twitchPlugin.streamerList) {
            var query = await twitch.searchChannels({ query: channel.broadcaster_login })
            var found = query.data.find(nchannel => nchannel.broadcaster_login == channel.broadcaster_login)
            if (!found) return
            if (found.is_live == true && found.is_live != channel.alreadySend) return sendEmbed(guild,channel,found)
        }
        function sendEmbed(guild,channel,found) {
            channel.alreadySend == found.is_live
            var textChannel = guild.channels.cache.get(guild.plugins.twitchPlugin.channelId)
            var thumbnail = selectUser.thumbnail_url.replace("-{width}x{height}","")
            const streamingEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(selectUser.user_name+" is live right now")
            .setURL("https://twitch.tv/"+selectUser.user_login)
            .setDescription(selectUser.title)
            .setImage(thumbnail)
            textChannel.send({embeds:[streamingEmbed]})
        }
	}
};