const membersSchema = require('../schemas/members-schema');

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
                roles:rolesKeys,
            }
            listChannels.set(memberId,memberObj)
        });
        try {
            await membersSchema.findOneAndUpdate({
                _id:guild.id,
            }, { 
                members: listChannels
            },
            {
                upsert:true,
            })
        } catch (error) {
            console.log(error)
        } 
        console.log("Member fetched")
    }
};

