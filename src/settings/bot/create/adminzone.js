const { Permissions } = require("discord.js");
const createreportembed = require("./embeds/reportsembed")
const createwarnembed = require("./embeds/warnembed")
const perms = new Permissions([
    Permissions.FLAGS.VIEW_CHANNEL,
]);
module.exports = {
	async execute(interaction,lang) {
        var guild = interaction.guild
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        await guild.channels.create('Admin Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [perms]}
            ],
        })
        .then(cat => {
            guild.channels.create(`reports`,  {type: 'GUILD_TEXT',parent: cat}).then(async (channel) => {
                await createreportembed.execute(interaction,channel,lang)
            })
            guild.channels.create(`log`,  {type: 'GUILD_TEXT',parent: cat})
            guild.channels.create(`warn`,  {type: 'GUILD_TEXT',parent: cat}).then(async (channel) => {
                await createwarnembed.execute(interaction,channel,lang)
            })
        })
        console.log(`Created Admin Zone in ${guild.name}`)
    }
}
