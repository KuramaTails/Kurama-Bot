const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true
}
const reqBoolean= {
    type: Boolean,
    required: true
}
const leaveSchema = mongoose.Schema({
    _id: reqString,
    active: reqBoolean,
    channelId: reqString,
    text: reqString,
    background:reqString,
})

module.exports = mongoose.model('leave-channels' , leaveSchema)