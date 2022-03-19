const membersSchema = require('../schemas/members-schema');
const dbconnect = require('./dbconnect');

module.exports = {
    async execute(guild) {
        var members = await guild.members.fetch()
        var listChannels = new Map()
        members.forEach(member => {
            var memberId= member.id
            var roles = member.roles.cache
            var rolesKeys = Array.from(roles.keys())
            var memberObj = {
                bot:member.user.bot,
                username:member.user.username,
                roles:[rolesKeys],
            }
            listChannels.set(memberId,memberObj)
        });
        await dbconnect().then(async (mongoose)=> {
            try {
                await membersSchema.findOneAndUpdate({
                    _id:guild.id,
                }, {
                    _id:guild.id,
                    listChannels,
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

