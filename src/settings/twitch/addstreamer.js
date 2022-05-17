const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,twitch) {
        var twitchPlugin = interaction.guild.settings.plugins.twitchPlugin
        if (!twitchPlugin.channelId) return interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["selectChannel"], ephemeral: true })
        var str = interaction.fields.getTextInputValue('textInput')
        var str1 = str.replace(/ /g,'')
        var str2 = str1.toLowerCase()
        var streamerUsername = str2.split(",")
        var pushed = ''
        var replied = false
        for (const streamer of streamerUsername) {
            var query = await twitch.searchChannels({ query: streamer })
            var selectUser = await query.data.find(channel => channel.broadcaster_login == `${streamer}`)
            if (!selectUser) return interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["notFound"], ephemeral: true })
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
                _id: interaction.member.guild.id,
                }, {
                    $push: {
                        "plugins.twitchPlugin.streamerList": selectUserDb,
                    }
                }, {
                    upsert:true,
                }
            )
            await dbdisconnect()
            var updateEmbed = interaction.message.embeds[0]
            updateEmbed.fields[0].value+=`\n- ${selectUser.display_name}`
        }
        await interaction.message.edit({embeds:[updateEmbed]})
        switch (replied) {
            case true:
                var reply1=`One or more were already added,this are the added one: ${pushed}.`
                var reply2=lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["alreadyAdded"]
                streamerUsername.length>1? interaction.editReply({ content:reply1, ephemeral: true }) : interaction.editReply({ content:reply2, ephemeral: true })
            break;
            case false:
                interaction.editReply({ content:lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.replies["added"]+` ${pushed}.`, ephemeral: true })
            break;
        }
        console.log(`Added streamer notification in ${interaction.guild.name}`)
	}
};