const guildSchema = require('../schemas/guild-schema');

module.exports = {
    async execute(guild) {
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
        } catch (error) {
            console.log(error)
        }
        
    }
};