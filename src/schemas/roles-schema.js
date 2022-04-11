const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const reqMap = {
    type: Map,
    required: true,
}
const rolesSchema = mongoose.Schema({
    _id:reqString,
    roles: reqMap,   
})

module.exports = mongoose.model('roles' , rolesSchema)