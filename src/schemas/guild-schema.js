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
    plugins : {
        twitchPlugin: {
            active:reqBoolean,
            channelId:reqString,
            streamerList:reqArray
        },
        autorolePlugin:{
            active:reqBoolean,
            role:reqString
        },
        welcomerPlugin:{
            active: reqBoolean,
            channelId: reqString,
            textWelcomer: reqString,
            textColor: reqString,
            background:reqString,
        },
        leaverPlugin:{
            active: reqBoolean,
            textLeaver: reqString,
        },
        playerPlugin:{
            channelId: reqString,
            volume: reqString,
        },
        chooseRolePlugin: {
            channelId:reqString,
        }
    }
})

module.exports = mongoose.model('guilds' , guildSchema)