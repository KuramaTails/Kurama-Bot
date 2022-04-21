const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnect = require('../../misc/db/dbdisconnect');
const welcomeSchema = require('../../schemas/welcome-schema');
const welcomersettings = require('../create/settings/welcomersettings');
module.exports = {
    part:6,
    async execute(interaction,lang,button) {
        await dbconnect()
        await welcomeSchema.findOneAndUpdate({
            _id: interaction.guild.id,
        }, {
            activeWelcome:button,
            activeLeave:false,
        },
        {
            upsert:true,
        })
        await dbdisconnect()
        await welcomersettings.execute(interaction,lang)
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama Tutorial (5/6) : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).tutorial.part5["field1"],lang.get(interaction.guild.lang).tutorial.part5["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('tutorial-SelectPlayerChannel')
                .setPlaceholder(lang.get(interaction.guild.lang).tutorial["selectPlayerChannel"])
                
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