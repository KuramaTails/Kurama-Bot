const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
module.exports = {
    async execute(guild,botId,commands) {
        try {
            await rest.put(Routes.applicationGuildCommands(botId, guild.id), { body: commands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
            let commandsList = await guild.commands.fetch()
            var roles = await guild.roles.fetch()
            let moderation = await commandsList.find(command => command.name === "moderation")
            let keys = Array.from( roles.keys() );
            var allPermissions = []
            for (let i = 0; i < keys.length; i++) {
                if (roles.get(keys[i]).permissions.has("ADMINISTRATOR")) {
                    const permissions = [{
                        id: roles.get(keys[i]).id,
                            type: 'ROLE',
                            permission: true,
                    }];
                    allPermissions.push.apply(allPermissions,permissions)
                }
                else {
                    const permissions = [{
                        id: roles.get(keys[i]).id,
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
    