const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true
}
const reqBoolean= {
    type: Boolean,
    required: true
}
const welcomeSchema = mongoose.Schema({
    _id: reqString,
    active: reqBoolean,
    channelId: reqString,
    text: reqString,
    background:reqString,
})

module.exports = mongoose.model('welcome-channels' , welcomeSchema)