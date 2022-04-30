const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(modal,lang,twitch) {
        var twitchPlugin = modal.guild.settings.plugins.twitchPlugin
        if (!twitchPlugin.channelId) return
        if (!twitchPlugin.streamerList) return
        var streamerUsername = modal.getTextInputValue('textinput-customid')
        var query = await twitch.searchChannels({ query: streamerUsername })
        var selectUser = query.data.find(channel => channel.broadcaster_login == streamerUsername)
        if (!selectUser) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["notFound"], ephemeral: true })
        if (twitchPlugin.streamerList) {
            if (!twitchPlugin.streamerList.find(streamer=> streamer.broadcaster_login == selectUser.broadcaster_login)) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["notListed"], ephemeral: true })
            twitchPlugin.streamerList.pop(selectUser)
            await dbconnect()
            await guildSchema.findOneAndUpdate({
                _id: modal.member.guild.id,
                }, {
                    $pull: {
                        "plugins.twitchPlugin.streamerList": {broadcaster_login:selectUser.broadcaster_login},
                    }
                }, {
                    upsert:true,
                }
            )
            await dbdisconnect()
            return await modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["foundDelete"], ephemeral: true }) 
        }
	}
};