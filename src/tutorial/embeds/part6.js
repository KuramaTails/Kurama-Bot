const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnect = require('../../misc/db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
module.exports = {
    part:7,
    async execute(interaction,lang) {
        await dbconnect()
        await guildSchema.findOneAndUpdate({
        _id: interaction.guild.id,
        }, {
            $set: {
                "plugins.playerPlugin.channelId": interaction.values[0],
            }
        },
        {
            upsert:true,
        })
        await dbdisconnect()
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (6/6) : Autorole")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).tutorial.part6["field1"],lang.get(interaction.guild.lang).tutorial.part6["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-yes`)
            .setLabel(lang.get(interaction.guild.lang).tutorial["yes"])
            .setStyle(`SUCCESS`),
        )
        button1.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-no`)
            .setLabel(lang.get(interaction.guild.lang).tutorial["no"])
            .setStyle(`DANGER`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};