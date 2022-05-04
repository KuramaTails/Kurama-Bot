module.exports = {
    async execute(twitchPlugin,twitch) {
        for (var channel of twitchPlugin.streamerList) {
            var query = await twitch.searchChannels({ query: channel.broadcaster_login })
            var found = query.data.find(nchannel => nchannel.broadcaster_login == channel.broadcaster_login)
            if (!found) return
            found.alreadySend = found.is_live
            var foundIndex = twitchPlugin.streamerList.findIndex(lchannel => lchannel.broadcaster_login == channel.broadcaster_login);
            twitchPlugin.streamerList[foundIndex] = found;
        }
	}
};