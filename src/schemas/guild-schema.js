const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const reqBoolean = {
    type: Boolean,
    required: true,
}
const reqArray = {
    type: Array,
    required: true,
}
const guildSchema = mongoose.Schema({
    _id:reqString,
    guildName:reqString,
    guildMemberCount:reqString,
    guildLang:reqString,
    guildAutorolePluginActive:reqBoolean,
    guildAutorolePluginRole:reqString,
    guildTwitchPluginActive:reqBoolean,
    guildTwitchPluginArray:reqArray,
    guildTwitchPluginChannelId:reqString,
    plugins : {
        twitchPlugin: {
            active:reqBoolean,
            channelId:reqString,
            streamerList:reqArray
        }
    }
})

module.exports = mongoose.model('guilds' , guildSchema)