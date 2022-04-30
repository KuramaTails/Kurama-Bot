const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const dbconnect = require('../../db/dbconnect');
const dbdisconnect = require('../../db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
module.exports = {
    part:6,
    async execute(interaction,lang,button) {
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            $set: {
                "plugins.welcomerPlugin.active": button,
            }
        },
        {
            upsert:true,
        })
        await dbdisconnect()
        interaction.guild.settings.plugins={welcomerPlugin:{active :button} }
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (5/6) : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part5["field1"],lang.get(interaction.guild.settings.lang).tutorial.part5["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('tutorial-SelectPlayerChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
                
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
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};