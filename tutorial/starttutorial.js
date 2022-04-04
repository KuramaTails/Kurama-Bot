const { Permissions, MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const kuramaZonePermissions = new Permissions([
    Permissions.FLAGS.VIEW_CHANNEL,
]);
module.exports = {
    async execute(guild,lang) {
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        await guild.channels.create('Kurama-Zone', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [{id: everyone.id,deny: [kuramaZonePermissions]}
            ],
        })
        .then(cat => {
            guild.channels.create(`Start-with-kurama`,  {
                type: 'GUILD_TEXT',parent: cat,
                }).then(channel => {
                    const TutorialEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Bot Kurama : Start Tutorial")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                    .setDescription(lang.get(guild.lang).tutorial.start["desc"])
                    .addField(lang.get(guild.lang).tutorial.start["field1"],lang.get(guild.lang).tutorial.start["field2"])
                    const button1 = new MessageActionRow()
                    button1.addComponents(
                        new MessageButton()
                        .setCustomId(`tutorial-start`)
                        .setLabel("✅")
                        .setStyle(`SUCCESS`),
                    )
                    channel.send({embeds:[TutorialEmbed],components:[button1]})
                })
        });
    }
};