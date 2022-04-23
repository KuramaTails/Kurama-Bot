const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(modal,lang,twitch) {
        var streamerUsername = modal.getTextInputValue('textinput-customid')
        var query = await twitch.searchChannels({ query: streamerUsername })
        var selectUser = query.data.find(channel => channel.broadcaster_login == streamerUsername)
        if (selectUser) {
            await dbconnect()
            var queue = await guildSchema.find({_id: modal.member.guild.id})
            var arr = queue[0].guildTwitchPluginArray
            if (!arr.find(elem => elem == streamerUsername) || arr.length<1) {
                arr.push(streamerUsername)
                await guildSchema.findOneAndUpdate({
                    _id: modal.member.guild.id,
                    }, {
                        guildTwitchPluginArray:arr
                    },
                    {
                        upsert:true,
                    })
                    modal.guild.twitchPlugin.streamerList.push(streamerUsername)
                await modal.editReply({ content: "Streamer added to notification list", ephemeral: true })
                await dbdisconnect()
                return
            }
            await modal.editReply({ content: "Streamer already added to notification list", ephemeral: true })
            await dbdisconnect()
        }
        else {
            await modal.editReply({ content: "Streamer not found,retry", ephemeral: true })
        }
	}
};