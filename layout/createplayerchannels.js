const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
const channelpermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);
const playerEmbed = require('./createplayerembed')
module.exports = {
	async execute(messageCreate) {
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");
        var guild = await messageCreate.guild
        var guildChannels = await messageCreate.guild.channels;

        guildChannels.create('Music-Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [channelpermissions]}]
        })
        .then(cat => {
            guildChannels.create(`player-room`,  {
                type: 'GUILD_TEXT',parent: cat,
                })
                guildChannels.create(`Room 1`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guildChannels.create(`Room 2`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guildChannels.create(`Room 3`,  {
            type: 'GUILD_VOICE',parent: cat,
            })
        });
        playerEmbed.execute(guild)
    }
};