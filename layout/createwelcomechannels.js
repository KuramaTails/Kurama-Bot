const { Permissions} = require('discord.js');
const channelpermissions = new Permissions([
    Permissions.FLAGS.SEND_MESSAGES,
]);

const createEmbedRole = require('./createembedroles')
const createBasicRoles = require('./createbasicroless')

module.exports = {
	async execute(messageCreate) {
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");
        var guild = await messageCreate.guild.channels;
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
            guild.create(`welcome`,  {type: 'GUILD_TEXT',parent: cat});
            guild.create(`Choose-role`,  {type: 'GUILD_TEXT',parent: cat,})
        })
        setTimeout( async() => {
            await createEmbedRole.execute(guild)
            console.log(`Created rolesEmbed in ${guild.name}`)
        }, 2000);
        setTimeout(async () => {
            await createBasicRoles.execute(guild);
            console.log(`Created roles in ${guild.name}`)
        }, 10000);
    }
};
