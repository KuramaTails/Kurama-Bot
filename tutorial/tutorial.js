const { Permissions, MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const kuramaZonePermissions = new Permissions([
    Permissions.FLAGS.VIEW_CHANNEL,
]);
module.exports = {
    async execute(guild) {
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
                    .setDescription("Thanks for adding me to your discord. \n Please,follow this tutorial to set me up for your discord.\n It won't take long. ")
                    .addField("Warning: If the tutorial is skipped or not configured correctly, my correct function is not guaranteed...","Please click the button below to continue")
                    const button1 = new MessageActionRow()
                    button1.addComponents(
                        new MessageButton()
                        .setCustomId(`Tutorialstart`)
                        .setLabel("✅")
                        .setStyle(`SUCCESS`),
                    )
                    channel.send({embeds:[TutorialEmbed],components:[button1]})
                })
        });
    }
};