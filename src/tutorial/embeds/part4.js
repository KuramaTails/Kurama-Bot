const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const playerzone = require('../create/zone/playerzone');
module.exports = {
    part:5,
    async execute(interaction,lang,button) {
        button=="yes"? await playerzone.execute(interaction,lang) : ""
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (4/5) : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part5["field1"],lang.get(interaction.guild.settings.lang).tutorial.part5["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('tutorial-SelectPlayerChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
                
        )
        var textChannels = interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
        await textChannels.forEach(async channel => {
            await button1.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        await interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};