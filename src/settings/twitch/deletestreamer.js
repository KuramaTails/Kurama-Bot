const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,twitch) {
        var twitchPlugin = interaction.guild.settings.plugins.twitchPlugin
        if (!twitchPlugin.channelId) return
        if (!twitchPlugin.streamerList) return
        var str = interaction.fields.getTextInputValue('textInput')
        var str1 = str.replace(/ /g,'')
        var str2 = str1.toLowerCase()
        var streamerUsername = str2.split(",")
        var removed = ''
        var replied = false
        for (const streamer of streamerUsername) {
            var query = await twitch.searchChannels({ query: streamer })
            var selectUser = query.data.find(channel => channel.broadcaster_login == `${streamer}`)
            if (!selectUser) return interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["notFound"], ephemeral: true })
            if (twitchPlugin.streamerList) {
                if (!twitchPlugin.streamerList.find(streamer=> streamer.broadcaster_login == selectUser.broadcaster_login)) {
                    replied = true
                    continue
                }
                twitchPlugin.streamerList.pop(selectUser)
                removed+= `${selectUser.display_name},`
                await dbconnect()
                await guildSchema.findOneAndUpdate({
                    _id: interaction.member.guild.id,
                    }, {
                        $pull: {
                            "plugins.twitchPlugin.streamerList": {broadcaster_login:selectUser.broadcaster_login},
                        }
                    }, {
                        upsert:true,
                    }
                )
                await dbdisconnect()
                var updateEmbed = interaction.message.embeds[0]
                var str = updateEmbed.fields[0].value
                updateEmbed.fields[0].value = str.replace(`\n- ${selectUser.display_name}`, "");
            }
        }
        if(removed.length>1) await interaction.message.edit({embeds:[updateEmbed]})
        switch (replied) {
            case true:
                var reply1=`One or more were not in notification list,this are the deleted one: ${removed}.`
                var reply2=lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["notListed"]
                streamerUsername.length>1? interaction.editReply({ content:reply1, ephemeral: true }) : modal.editReply({ content:reply2, ephemeral: true })
            break;
            case false:
                interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["foundDelete"]+` ${removed}.`, ephemeral: true })
            break;
        }
        console.log(`Deleted streamer notification in ${interaction.guild.name}`) 
	}
};