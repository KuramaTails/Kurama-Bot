const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
const channelpermissions = new Permissions([
    Permissions.FLAGS.SEND_MESSAGES,
]);

module.exports = {
	async execute(messageCreate) {
        var guild = await messageCreate.guild.channels;
        const newEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Add Role')
        .setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(`Click on a button for receiving a role`)
        var roles = await messageCreate.guild.roles.fetch()
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");
        let keys = Array.from( roles.keys() );
        const filteredkeys = []
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
    }
};
