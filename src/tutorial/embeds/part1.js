const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const dbconnect = require('../../db/dbconnect');
const dbdisconnect = require('../../db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
module.exports = {
    part:2,
    async execute(interaction,lang,part) {
        await dbconnect()
        interaction.guild.settings.lang = part
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            $set: {
                "guildLang": part,
            }
        },
        {
            upsert:true,
        })
        await dbdisconnect()
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (1/5) : Serverstats")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part1["field1"],lang.get(interaction.guild.settings.lang).tutorial.part1["field2"])
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
