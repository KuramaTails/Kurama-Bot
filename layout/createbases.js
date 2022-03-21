const { Permissions } = require('discord.js');
const serverStatsPermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);
const welcomePermissions = new Permissions([
    Permissions.FLAGS.SEND_MESSAGES,
]);
module.exports = {
	async execute(guild) {
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        var memberCount = guild.memberCount
        var members = guild.members.cache
        var memberKeys = Array.from(members.keys())
        var onlineCount = 0
        var offlineCount = 0
        for (let i = 0; i < memberKeys.length; i++) {
            try {
                switch (members.get(memberKeys[i]).presence.status) {
                    case "online":
                        onlineCount=onlineCount+1
                    break;
                    case "idle":
                        onlineCount=onlineCount+1
                    break;
                    case "dnd":
                        onlineCount=onlineCount+1
                    break;
                    case "offline":
                        offlineCount=offlineCount+1
                    break;

                }
            } catch (error) {
                offlineCount=offlineCount+1 
            }
            
        }
        await guild.channels.create('Serverstats', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [serverStatsPermissions]}
            ],
        })
        .then(cat => {
            guild.channels.create(`Members : ${memberCount}`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guild.channels.create(`Online : ${onlineCount}`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guild.channels.create(`Offline : ${offlineCount}`,  {
                type: 'GUILD_VOICE',parent: cat,
                })
        });
        console.log(`Created server stats in ${guild.name}`)
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
            guild.channels.create(`Choose-role`,  {type: 'GUILD_TEXT',parent: cat,})
        })
        console.log(`Created welcome rooms in ${guild.name}`)
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