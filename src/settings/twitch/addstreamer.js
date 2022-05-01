const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(modal,lang,twitch) {
        var twitchPlugin = modal.guild.settings.plugins.twitchPlugin
        if (!twitchPlugin.channelId) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["selectChannel"], ephemeral: true })
        var streamerUsername = modal.getTextInputValue('textinput-customid')
        var query = await twitch.searchChannels({ query: streamerUsername })
        var selectUser = query.data.find(channel => channel.broadcaster_login == streamerUsername)
        if (!selectUser) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["notFound"], ephemeral: true })
        if (twitchPlugin.streamerList) {
            if (twitchPlugin.streamerList.find(streamer=> streamer.broadcaster_login == selectUser.broadcaster_login)) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["alreadyAdded"], ephemeral: true })
        }
        selectUser.alreadySend=selectUser.is_live
        twitchPlugin.streamerList.push(selectUser)
        var selectUserDb= {
            broadcaster_login:selectUser.broadcaster_login,
            display_name:selectUser.display_name
        }
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: modal.member.guild.id,
            }, {
                $push: {
                    "plugins.twitchPlugin.streamerList": selectUserDb,
                }
            }, {
                upsert:true,
            }
        )
        await dbdisconnect()
        return await modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["added"], ephemeral: true }) 
	}
};