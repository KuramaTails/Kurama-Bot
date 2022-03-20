const { Permissions} = require('discord.js');
const channelpermissions = new Permissions([
    Permissions.FLAGS.SEND_MESSAGES,
]);

module.exports = {
	async execute(guild) {
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        guild.create('Welcomer', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [
                {
                id: everyone.id,
                deny: [channelpermissions],
            },
            ],
        })
        .then(cat => {
            guild.channels.create(`welcome`,  {type: 'GUILD_TEXT',parent: cat});
            guild.channels.create(`Choose-role`,  {type: 'GUILD_TEXT',parent: cat,})
        })
    }
};
