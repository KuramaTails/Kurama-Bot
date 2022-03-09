const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
const channelpermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);

module.exports = {
	name: "createplayerchannels",
	ephemeral: "false",
	command:"CreatePlayerChannels",
	desc:"Create channels for player messages",
    example:"!createplayerchannels",
	async execute(messageCreate) {
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        var guild = await messageCreate.guild.channels;
        guild.create('Music-Zone', {
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
            guild.create(`player-room`,  {
                type: 'GUILD_TEXT',parent: cat,
                });
            guild.create(`Room 1`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
            guild.create(`Room 2`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
            guild.create(`Room3`,  {
            type: 'GUILD_VOICE',parent: cat,
            })
        
        });
    }
};