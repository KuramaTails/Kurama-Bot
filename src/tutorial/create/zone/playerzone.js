module.exports = {
	async execute(interaction) {
        var guild = interaction.guild
        await guild.channels.create('Music Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
        })
        .then(cat => {
            guild.channels.create(`player-room`,  {type: 'GUILD_TEXT',parent: cat});
            guild.channels.create(`Music 1`,  {type: 'GUILD_VOICE',parent: cat,})
            guild.channels.create(`Music 2`,  {type: 'GUILD_VOICE',parent: cat});
            guild.channels.create(`Music 3`,  {type: 'GUILD_VOICE',parent: cat,})
        })
        console.log(`Created player rooms in ${guild.name}`)
    }
}
