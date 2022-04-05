const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
    async execute(interaction,lang) {
        const settingsEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).player["desc1"],lang.get(interaction.guild.lang).player["desc2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('player-selectPlayerChannel')
                .setPlaceholder(lang.get(interaction.guild.lang).player["selectPlayerChannel"])
                
        )
        var textChannels = interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
        textChannels.forEach(channel => {
            button1.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        var channels = await interaction.guild.channels.fetch()
        var settingsChannel = channels.find(c => c.name == "player-settings" && c.type == "GUILD_TEXT")
        settingsChannel.send({embeds:[settingsEmbed],components:[button1]})
    }
};