const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const dbconnect = require('../../db/dbconnect');
const dbdisconnect = require('../../db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
const playerembed = require('../../settings/bot/create/embeds/playerembed');
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
        interaction.guild.settings.plugins.playerPlugin = {channelId:interaction.values[0]}
        await playerembed.execute(interaction,lang,interaction.values[0])
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (6/6) : Autorole")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part6["field1"],lang.get(interaction.guild.settings.lang).tutorial.part6["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-yes`)
            .setLabel(lang.get(interaction.guild.settings.lang).tutorial.buttons["yes"])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`tutorial-no`)
            .setLabel(lang.get(interaction.guild.settings.lang).tutorial.buttons["no"])
            .setStyle(`DANGER`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};