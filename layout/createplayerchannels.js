const playerEmbed = require('./createplayerembed')
const { Permissions } = require('discord.js');
const channelpermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);

module.exports = {
	async execute(guild) {
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");

        guild.channels.create('Music-Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [channelpermissions]}]
        })
        .then(cat => {
            guild.channels.create(`player-room`,  {
                type: 'GUILD_TEXT',parent: cat,
                })
                guild.channels.create(`Room 1`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guild.channels.create(`Room 2`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guild.channels.create(`Room 3`,  {
            type: 'GUILD_VOICE',parent: cat,
            })
        });
    }
};