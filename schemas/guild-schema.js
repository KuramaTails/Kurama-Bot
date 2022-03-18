const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const guildSchema = mongoose.Schema({
    _id:reqString,
    name:reqString,
    memberCount:reqString,
})

module.exports = mongoose.model('guilds' , guildSchema)
