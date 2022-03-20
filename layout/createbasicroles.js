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
    }
};