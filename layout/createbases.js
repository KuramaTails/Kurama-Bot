const { Permissions } = require('discord.js');
const serverStatsPermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);
module.exports = {
	async execute(guild) {
        muteRole = await guild.roles.create({
            name: 'Muted',
            color: 'NAVY',
          })
            guild.channels.cache.forEach(async channel => {
            await channel.permissionOverwrites.edit(muteRole, {
                SEND_MESSAGES: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                ADD_REACTIONS: false
            });
        });
        muteRole = await guild.roles.create({
            name: 'Member',
            color: 'WHITE',
            hoist: true,
          })
        console.log(`Created roles in ${guild.name}`)
        await guild.channels.create('Music-Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [serverStatsPermissions]}]
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
        console.log(`Created player rooms in ${guild.name}`)
    }
};