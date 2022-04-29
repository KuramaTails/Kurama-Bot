const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnect = require('../../misc/db/dbdisconnect');
const guildSchema = require('../../schemas/guild-schema');
module.exports = {
    part:2,
    async execute(interaction,lang,part) {
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            guildLang: part
        },
        {
            upsert:true,
        })
        await dbdisconnect()
        interaction.guild.settings.lang = part
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (1/6) : Serverstats")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).tutorial.part1["field1"],lang.get(interaction.guild.lang).tutorial.part1["field2"])
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
