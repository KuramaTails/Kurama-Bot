const mongoose = require('mongoose')
module.exports = async () => {
    await mongoose.connect(process.env.DATABASE_TOKEN,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`Connected to database`)
    return mongoose
}
    