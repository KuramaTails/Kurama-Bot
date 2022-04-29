const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
module.exports = {
    async execute(guild,botId,commands) {
        var listCommands = []
        commands.forEach(command => {
            listCommands.push(command.data.toJSON())
        });
        const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
        await rest.put(Routes.applicationGuildCommands(botId,guild.id), { body: listCommands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
        var commandsList = await guild.commands.fetch();
        var roles = await guild.roles.fetch()
        var allPermissions = []
        await roles.forEach(role => {
            if (role.name.includes("Kurama")) return
            const permissions = [{
                id: role.id,
                type: 'ROLE',
                permission: role.permissions.has("ADMINISTRATOR"),
            }];
            allPermissions.push.apply(allPermissions,permissions)
        });
        /*await commandsList.forEach(command => {
            guild.commands.permissions.add({
                command: command.id,
                permissions: allPermissions
            }).then(console.log(`Set permissions in ${guild.name}`))
            .catch(console.error);
        })        */
    }
};
    