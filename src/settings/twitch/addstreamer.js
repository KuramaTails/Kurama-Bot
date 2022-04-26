const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(modal,lang,twitch) {
        var twitchPlugin = modal.guild.settings.twitchPlugin
        var streamerUsername = modal.getTextInputValue('textinput-customid')
        var query = await twitch.searchChannels({ query: streamerUsername })
        var selectUser = query.data.find(channel => channel.broadcaster_login == streamerUsername)
        if (!selectUser) return modal.editReply({ content: "Streamer not found,retry", ephemeral: true })
        if (twitchPlugin.streamerList) {
            if (twitchPlugin.streamerList.find(streamer=> streamer.broadcaster_login == selectUser.broadcaster_login)) return modal.editReply({ content: "Streamer already added to notification list", ephemeral: true })
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
        return await modal.editReply({ content: "Streamer added to notification list", ephemeral: true }) 
	}
};