const guildSchema = require('../schemas/guild-schema');
const dbconnect = require('./dbconnect');

module.exports = {
    async execute(guild) {
        await dbconnect().then(async (mongoose)=> {
            try {
                await guildSchema.findOneAndUpdate({
                    _id:guild.id,
                }, {
                    _id:guild.id,
                    guildName:guild.name,
                    guildMemberCount:guild.memberCount
                },
                {
                    upsert:true,
                })
            } finally {
                mongoose.connection.close()
                console.log("Disconnected from database")
            }
        })
        
    }
};