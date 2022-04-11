const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const reqMap = {
    type: Map,
    required: true,
}
const memberSchema = mongoose.Schema({
    _id:reqString,
    members:reqMap, 
})

module.exports = mongoose.model('members' , memberSchema)