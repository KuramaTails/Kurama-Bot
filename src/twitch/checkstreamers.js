module.exports = {
    async execute(twitch,isLive) {
        var query = await twitch.searchChannels({ query: "voghelita" })
        if (query.data) {
            var channelFound = query.data.find(channel => channel.broadcaster_login == "voghelita")
            if (channelFound) {
                channelFound.is_live? channelFound.alreadySend=false : channelFound.alreadySend=true
                isLive.push(channelFound)
            }
        }
	}
};