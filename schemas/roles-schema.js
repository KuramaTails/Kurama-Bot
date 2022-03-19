const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const reqObjectId = {
    type: mongoose.Schema.Types.Array,
    of: mongoose.Schema.Types.String,
    required: true,
}
const rolesSchema = mongoose.Schema({
    _id:reqString,
    roles: reqObjectId    
})

module.exports = mongoose.model('roles' , rolesSchema)