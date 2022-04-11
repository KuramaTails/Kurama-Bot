const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const reqBoolean = {
    type: Boolean,
    required: true,
}
const autoroleSchema = mongoose.Schema({
    _id:reqString,
    active:reqBoolean,
    roleId: reqString,   
})

module.exports = mongoose.model('autorole' , autoroleSchema)