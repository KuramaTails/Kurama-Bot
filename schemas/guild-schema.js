const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}

const guildSchema = mongoose.Schema({
    _id:reqString,
    guildName:reqString,
    guildMemberCount:reqString
})

module.exports = mongoose.model('guilds' , guildSchema)