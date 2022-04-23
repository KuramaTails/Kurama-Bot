const { MessageEmbed } = require("discord.js");

module.exports = {
    async execute(guild,twitch,twitchPlugin) {
        if (twitchPlugin.active!=true) return 
        if (!twitchPlugin.channelId) return
        if (twitchPlugin.streamerList.length>1) {
            twitchPlugin.streamerList.forEach(async channel => {
                var streamerUsername = channel.broadcaster_login
                var query = await twitch.searchChannels({ query:streamerUsername})
                if (query) {
                    var selectUser = query.data.find(channel => channel.broadcaster_login == streamerUsername)
                    if (selectUser.is_live != twitchPlugin.streamerList.find(nchannel=> nchannel.broadcaster_login == streamerUsername).alreadySend) {
                        selectUser.is_live? sendEmbed(guild,selectUser) : ""
                        twitchPlugin.streamerList.find(nchannel=> nchannel.broadcaster_login == streamerUsername).alreadySend=selectUser.is_live
                    }
                }
            });
        }
        
        function sendEmbed(guild,selectUser) {
            var channel = guild.channels.cache.get(twitchPlugin.channelId)
            var thumbnail = selectUser.thumbnail_url.replace("-{width}x{height}","")
            const streamingEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(selectUser.user_name+" is live right now")
            .setURL("https://twitch.tv/"+selectUser.user_login)
            .setDescription(selectUser.title)
            .setImage(thumbnail)
            channel.send({embeds:[streamingEmbed]})
        }
	}
};