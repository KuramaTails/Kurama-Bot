const { Permissions } = require('discord.js');
const createembedroles = require('./createembedroles');
const welcomePermissions = new Permissions([
    Permissions.FLAGS.SEND_MESSAGES,
]);
module.exports = {
	async execute(interaction) {
        var guild = interaction.guild
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        await guild.channels.create('Welcomer', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [
                {
                id: everyone.id,
                deny: [welcomePermissions],
                },
            ],
        })
        .then(cat => {
            guild.channels.create(`welcome`,  {type: 'GUILD_TEXT',parent: cat});
            guild.channels.create(`Choose-role`,  {type: 'GUILD_TEXT',parent: cat,}).then (channel => createembedroles.execute(channel))
        })
        console.log(`Created welcome rooms in ${guild.name}`)
    }
}
