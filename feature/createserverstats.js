const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
const channelpermissions = new Permissions([
    Permissions.FLAGS.CONNECT,
]);

module.exports = {
	name: "createserverstats",
	ephemeral: "false",
	command:"CreateServerStats",
	desc:"Create channels for server stats",
    example:"!createserverstats",
	async execute(messageCreate, args) {
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        var guild = await messageCreate.guild.channels;
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");
        let members = await messageCreate.guild.members.fetch()
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
        guild.create('Serverstats', {
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
            guild.create(`Members : ${countMembers.length}`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
            guild.create(`Online : ${onlineMembers.length}`,  {
                type: 'GUILD_VOICE',parent: cat,
                });
            guild.create(`Offline : ${offlineMembers.length}`,  {
            type: 'GUILD_VOICE',parent: cat,
            })
        
        });
    }
};