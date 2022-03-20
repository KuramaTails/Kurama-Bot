const rolesSchema = require('../schemas/roles-schema');

module.exports = {
    async execute(guild) {
        var roles = await guild.roles.fetch()
        var listChannels = new Map()
        roles.forEach(role => {
            var roleId = role.id
            var roleObj= {
                name: role.name,
                admin: role.permissions.has("ADMINISTRATOR"),
                managed: role.managed,
            }
            listChannels.set(roleId,roleObj)
        });
        try {
            await rolesSchema.findOneAndUpdate({
                _id:guild.id,
            }, { 
                roles: listChannels
            },
            {
                upsert:true,
            })
        } catch (error) {
            console.log(error)
        }
    }
};
