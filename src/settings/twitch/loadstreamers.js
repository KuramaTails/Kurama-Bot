const guildSchema = require("../../schemas/guild-schema");

module.exports = {
    async execute(guild,twitch) {
        guild.twitchPlugin = {
            active:Boolean,
            channelId:String,
            streamerList:[]
        }
        var queue = await guildSchema.find({_id: guild.id})
        if (queue[0]) {
            guild.twitchPlugin.active = queue[0].guildTwitchPluginActive
            guild.twitchPlugin.active? 
            (queue[0].guildTwitchPluginArray.forEach(async channel => {
                var query = await twitch.searchChannels({ query: channel })
                var selectUser = query.data.find(nchannel => nchannel.broadcaster_login == channel)
                selectUser? (selectUser.is_live? selectUser.alreadySend=false : selectUser.alreadySend=true,guild.twitchPlugin.streamerList.push(selectUser)) : ""
            }),
            guild.twitchPlugin.channelId = queue[0].guildTwitchPluginChannelId) : ""
        }
	}
};