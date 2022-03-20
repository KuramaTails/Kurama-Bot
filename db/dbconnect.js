const mongoose = require('mongoose')
module.exports = async () => {
    await mongoose.connect(process.env.DATABASE_TOKEN,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((err) => {console.error(err);});
    if (mongoose.connection.readyState === 1) {
        console.log("Successfully connected to database");
       }

    return mongoose
}
    