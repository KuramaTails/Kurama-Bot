const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const fs= require('fs');
module.exports = {
    async execute(interaction,channel,lang,plugins) {
        var welcomerPlugin = plugins.welcomerPlugin
        const channelEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Choose channel")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.embeds["chooseChannelDesc1"],lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.embeds["chooseChannelDesc2"])
        const button2 = new MessageActionRow()
        button2.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-welcomer-selectWelcomerChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"]) 
        )
        var textChannels = await interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
        textChannels.forEach(channel => {
            button2.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        const textWelcomerEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Welcomer Text")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["text"]+` \`${welcomerPlugin.textWelcome}\``,lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.embeds["changeTextDesc"])
        const buttonWelcomertext = new MessageActionRow()
        buttonWelcomertext.addComponents(
            new MessageButton()
            .setCustomId(`settings-welcomer-textWelcomer`)
            .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.embeds["changeTextDesc"])
            .setStyle(`SECONDARY`),
        )
        const backgroundEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Choose Background")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.embeds["chooseBackgroundDesc1"],lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.embeds["chooseBackgroundDesc2"])
        const button3 = new MessageActionRow()
        button3.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-welcomer-selectWelcomerBackground')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
        )
        const background = fs.readdirSync('./src/welcomer/backgrounds').filter(file => file.endsWith('.jpg'));
        background.forEach(image => {
            var fullName = image.split(".")
            button3.components[0].addOptions([
                {
                    label: `${fullName[0]}`,
                    value: `./src/welcomer/backgrounds/${fullName[0]}`,
                },
            ])
        });
        await channel.send({embeds:[channelEmbed],components:[button2]})
        await channel.send({embeds:[textWelcomerEmbed],components:[buttonWelcomertext]})
        await channel.send({embeds:[backgroundEmbed],components:[button3]})
    }
};