const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rolesSchema = require('../schemas/roles-schema');
module.exports = {
    async execute(guild,botId,commands) {
        try {
            const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
            await rest.put(Routes.applicationGuildCommands(botId, guild.id), { body: commands })
                .then(() => console.log('Successfully registered application commands.'))
                .catch(console.error);
            let commandsList = await guild.commands.fetch()
            let moderation = await commandsList.find(command => command.name === "moderation")
            var selectGuildroles = await rolesSchema.find({ "_id" : guild.id})
            var keysChannelsroles = Array.from(selectGuildroles[0].roles.keys())
            var allPermissions = []
            for (let i = 0; i < keysChannelsroles.length; i++) {
                if (selectGuildroles[0].roles.get(keysChannelsroles[i]).admin == true) {
                    const permissions = [{
                        id: keysChannelsroles[i],
                            type: 'ROLE',
                            permission: true,
                    }];
                    allPermissions.push.apply(allPermissions,permissions)
                }
                else {
                    const permissions = [{
                        id: keysChannelsroles[i],
                            type: 'ROLE',
                            permission: false,
                    }];
                    allPermissions.push.apply(allPermissions,permissions)
                }
            }
            await moderation.permissions.add({ command: moderation.id,
                permissions: allPermissions})
                    .then(console.log(`Set permissions in ${guild.name}`))
                    .catch(console.error);
            
        } catch (error) {
            console.log(error)
        }
    }
};
    