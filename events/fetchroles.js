const rolesSchema = require('../schemas/roles-schema');
const dbconnect = require('./dbconnect');

module.exports = {
    async execute(guild) {
        var roles = await guild.members.fetch()
        var rolesKeys= Array.from(roles.keys())
        console.log(rolesKeys)
        await dbconnect().then(async (mongoose)=> {
            try {
                await rolesSchema.findOneAndUpdate({
                    _id:guild.id,
                }, {
                    _id:guild.id,
                    roles: rolesKeys
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
