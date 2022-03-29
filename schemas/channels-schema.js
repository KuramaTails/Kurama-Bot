const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const reqMap = {
    type: Map,
    required: true,
}
const channelsSchema = mongoose.Schema({
    _id:reqString,
    channels:reqMap, 
})

module.exports = mongoose.model('channels' , channelsSchema)