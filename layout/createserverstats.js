const { Permissions } = require('discord.js');
const channelpermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);

module.exports = {
	async execute(guild) {
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        let members = await guild.members.fetch()
        let countMembers = Array.from(members.keys())
        let onlineMembers = []
        let offlineMembers = []
        for (let i = 0; i < countMembers.length; i++) {
            try {
                switch (members.get(countMembers[i]).presence.status) {
                    case "online":
                        onlineMembers.push(members.get(countMembers[i]))
                    break;
                    case "idle":
                        onlineMembers.push(members.get(countMembers[i]))
                    break;    
                    case "dnd":
                        onlineMembers.push(members.get(countMembers[i]))
                    break;    
                    case "offline":
                        offlineMembers.push(members.get(countMembers[i]))
                    break;
                }
            } catch (error) {
                offlineMembers.push(members.get(countMembers[i]))
            }
        }
        guild.channels.create('Serverstats', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [channelpermissions]}
            ],
        })
        .then(cat => {
            guild.channels.create(`Members : ${countMembers.length}`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guild.channels.create(`Online : ${onlineMembers.length}`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
                guild.channels.create(`Offline : ${offlineMembers.length}`,  {
                type: 'GUILD_VOICE',parent: cat,
                })
        });
    }
};