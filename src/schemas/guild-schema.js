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
    guildAutoroleActive:reqBoolean,
    guildAutoroleSelectedRole:reqString,
    guildTwitchPluginActive:reqBoolean,
    guildTwitchPluginArray:reqArray,
    guildTwitchPluginChannelId:reqString,
})

module.exports = mongoose.model('guilds' , guildSchema)