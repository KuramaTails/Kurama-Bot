const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const dbconnect = require('../../db/dbconnect');
const dbdisconnect = require('../../db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
const botsettings = require('../create/settings/botsettings');
module.exports = {
    part:8,
    async execute(interaction,lang,button) {
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            $set: {
                "plugins.autorolePlugin.active": button,
            }
        },
        {
            upsert:true,
        })
        interaction.guild.settings.plugins.autorolePlugin = {active:button}
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