const { MessageActionRow, MessageEmbed, MessageButton, Permissions } = require('discord.js');
const Perms = new Permissions([
    Permissions.FLAGS.VIEW_CHANNEL,
]);
module.exports = {
    async execute(interaction,lang,index) {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Ticket Start")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).zones.ticketZone["startEmbedField1"],lang.get(interaction.guild.settings.lang).zones.ticketZone["startEmbedField2"])
        const buttons = new MessageActionRow()
        buttons.addComponents(
            new MessageButton()
            .setCustomId(`ticket-close`)
            .setLabel(lang.get(interaction.guild.settings.lang).zones.ticketZone["startBtn"])
            .setStyle(`SECONDARY`),
        )
        let everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");
        var selectedChannel = interaction.guild.channels.cache.find(c => c.name == "Ticket Zone" && c.type == "GUILD_CATEGORY")
        interaction.guild.channels.create(
            "ticket-"+index,
            {type: 'GUILD_TEXT',
            parent: selectedChannel,
            permissionOverwrites: [
                {
                id: everyone.id,
                deny: [Perms],
                },
                {
                id: interaction.member.user.id,
                allow: [Perms],
                },
            ]},
        ).then(async (channel) => {
            await interaction.deferUpdate()
            channel.send({embeds:[Embed],components:[buttons]})
        })
    }
};
