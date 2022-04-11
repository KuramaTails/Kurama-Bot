const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true
}
const playerSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
})

module.exports = mongoose.model('player-channels' , playerSchema)