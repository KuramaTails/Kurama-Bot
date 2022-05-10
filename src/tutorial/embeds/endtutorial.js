const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const dbconnect = require('../../db/dbconnect');
const dbdisconnect = require('../../db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
const botsettings = require('../create/settings/botsettings');
const playerembed = require("../../settings/bot/create/embeds/playerembed")

module.exports = {
    part:6,
    async execute(interaction,lang,button) {
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
        interaction.guild.settings.plugins = {playerPlugin:{channelId:interaction.values[0]}}
        await playerembed.execute(interaction,lang,interaction.values[0])
        await botsettings.execute(interaction,lang)
        await dbdisconnect()
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : End Tutorial")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(lang.get(interaction.guild.settings.lang).tutorial.end["desc"])
        .addField(lang.get(interaction.guild.settings.lang).tutorial.end["field1"],lang.get(interaction.guild.settings.lang).tutorial.end["field2"])

        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageButton()
            .setCustomId(`tutorial-end`)
            .setLabel("🏁")
            .setStyle(`SECONDARY`),
        )
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};