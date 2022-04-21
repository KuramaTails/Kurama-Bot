const { MessageEmbed } = require("discord.js");

module.exports = {
    async execute(twitch,isLive) {
        var query = await twitch.searchChannels({ query: "voghelita" })
        if (query.data) {
            var channelFound = query.data.find(channel => channel.broadcaster_login == "voghelita")
            if (channelFound) {
                switch (channelFound.is_live != isLive.find(channel=> channel.broadcaster_login == "voghelita").alreadySend) {
                    case true:
                        channelFound.is_live? sendEmbed(channelFound) : ""
                        isLive.find(channel=> channel.broadcaster_login == "voghelita").alreadySend=channelFound.is_live
                    break
                }
            }
        }
        function sendEmbed(channelFound) {
            var thumbnail = channelFound.thumbnail_url.replace("-{width}x{height}","")
            const streamingEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(channelFound.user_name+" is live right now")
            .setURL("https://twitch.tv/"+channelFound.user_login)
            .setDescription(channelFound.title)
            .setImage(thumbnail)
        }
	}
};