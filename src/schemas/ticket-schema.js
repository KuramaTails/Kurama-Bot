const mongoose = require ('mongoose')
const reqString = {
    type: String,
    required: true,
}
const ticketSchema = mongoose.Schema({
    _id:reqString,
    counter:{ type: Number, default: 0 }, 
})

module.exports = mongoose.model('ticket' , ticketSchema)