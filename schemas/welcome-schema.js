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
    channelId: reqString,
    activeWelcome: reqBoolean,
    textWelcome: reqString,
    activeLeave: reqBoolean,
    textLeave: reqString,
    background:reqString,
})

module.exports = mongoose.model('welcome-channels' , welcomeSchema)