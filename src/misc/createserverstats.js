const { Permissions } = require('discord.js');
const serverStatsPermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);
module.exports = {
	async execute(interaction) {
        var guild = interaction.guild
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
    }
}