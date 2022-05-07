const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(modal,lang,twitch) {
        var twitchPlugin = modal.guild.settings.plugins.twitchPlugin
        if (!twitchPlugin.channelId) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["selectChannel"], ephemeral: true })
        var str = modal.getTextInputValue('textinput-customid')
        var str1 = str.replace(/ /g,'')
        var str2 = str1.toLowerCase()
        var streamerUsername = str2.split(",")
        var pushed = ''
        var replied = false
        for (const streamer of streamerUsername) {
            var query = await twitch.searchChannels({ query: streamer })
            var selectUser = await query.data.find(channel => channel.broadcaster_login == `${streamer}`)
            if (!selectUser) return modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["notFound"], ephemeral: true })
            if (twitchPlugin.streamerList) {
                if (twitchPlugin.streamerList.find(streamer=> streamer.broadcaster_login == selectUser.broadcaster_login)) {
                    replied = true
                    continue
                }
            }
            selectUser.alreadySend=selectUser.is_live 
            if (!twitchPlugin.streamerList) twitchPlugin.streamerList=[]
            twitchPlugin.streamerList.push(selectUser)
            pushed+= `${selectUser.display_name},`
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
            var updateEmbed = modal.message.embeds[0]
            updateEmbed.fields[0].value+=`\n- ${selectUser.display_name}`
        }
        await modal.message.edit({embeds:[updateEmbed]})
        switch (replied) {
            case true:
                var reply1=`One or more were already added,this are the added one: ${pushed}.`
                var reply2=lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["alreadyAdded"]
                streamerUsername.length>1? modal.editReply({ content:reply1, ephemeral: true }) : modal.editReply({ content:reply2, ephemeral: true })
            break;
            case false:
                modal.editReply({ content:lang.get(modal.guild.settings.lang).settings.plugins.twitchPlugin.replies["added"]+` ${pushed}.`, ephemeral: true })
            break;
        }
        console.log(`Added streamer notification in ${modal.guild.name}`)
	}
};