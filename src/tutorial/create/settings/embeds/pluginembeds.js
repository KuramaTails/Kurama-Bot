const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        var plugins = interaction.guild.settings.plugins
        const zoneEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Zones creator")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).settings.embeds.zones['desc1'],lang.get(interaction.guild.lang).settings.embeds.zones['desc2'])                
        const buttons1 = new MessageActionRow()
        buttons1.addComponents(
            new MessageButton()
            .setCustomId(`tag1`)
            .setLabel("Admin Zone:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-adminZoneEnable`)
            .setLabel(lang.get(interaction.guild.lang).settings['create'])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-adminZoneDisable`)
            .setLabel(ang.get(interaction.guild.lang).settings['delete'])
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        var par = interaction.guild.channels.cache.find(channel =>channel.name == "Admin Zone")
        if (par) {
            buttons1.components.forEach(button => {
                !button.customId.includes("tag") && button.disabled? button.disabled=false : button.disabled=true
            });
        }
        const buttons2 = new MessageActionRow()
        buttons2.addComponents(
            new MessageButton()
            .setCustomId(`tag2`)
            .setLabel("Ticket Zone:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-ticketZoneEnable`)
            .setLabel(lang.get(interaction.guild.lang).settings['create'])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-ticketZoneDisable`)
            .setLabel(lang.get(interaction.guild.lang).settings['delete'])
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        var par = interaction.guild.channels.cache.find(channel =>channel.name == "Ticket Zone")
        if (par) {
            buttons2.components.forEach(button => {
                !button.customId.includes("tag") && button.disabled? button.disabled=false : button.disabled=true
            });
        }
        const pluginEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Plugins Enabler")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.lang).settings.embeds.plugins['desc1'],lang.get(interaction.guild.lang).settings.embeds.plugins['desc2'])                
        const buttons3 = new MessageActionRow()
        buttons3.addComponents(
            new MessageButton()
            .setCustomId(`tag3`)
            .setLabel("Autorole Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-autorolePluginEnable`)
            .setLabel(lang.get(interaction.guild.lang).settings['enable'])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-autorolePluginDisable`)
            .setLabel(lang.get(interaction.guild.lang).settings['disable'])
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        var par = interaction.guild.channels.cache.find(channel =>channel.name == "autorole-plugin")
        if (par) {
            buttons3.components.forEach(button => {
                !button.customId.includes("tag") && button.disabled? button.disabled=false : button.disabled=true
            });
        }
        const buttons4 = new MessageActionRow()
        buttons4.addComponents(
            new MessageButton()
            .setCustomId(`tag4`)
            .setLabel("Twitch Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-twitchPluginEnable`)
            .setLabel(lang.get(interaction.guild.lang).settings['enable'])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-twitchPluginDisable`)
            .setLabel(lang.get(interaction.guild.lang).settings['disable'])
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        var par = interaction.guild.channels.cache.find(channel =>channel.name == "twitch-plugin")
        if (par) {
            buttons4.components.forEach(button => {
                !button.customId.includes("tag") && button.disabled? button.disabled=false : button.disabled=true
            });
        }
        const buttons5 = new MessageActionRow()
        buttons5.addComponents(
            new MessageButton()
            .setCustomId(`tag5`)
            .setLabel("Welcomer Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-welcomerPluginEnable`)
            .setLabel(lang.get(interaction.guild.lang).settings['enable'])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-welcomerPluginDisable`)
            .setLabel(lang.get(interaction.guild.lang).settings['disable'])
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        var par = interaction.guild.channels.cache.find(channel =>channel.name == "welcomer-plugin")
        if (par) {
            buttons5.components.forEach(button => {
                !button.customId.includes("tag") && button.disabled? button.disabled=false : button.disabled=true
            });
        }
        const buttons6 = new MessageActionRow()
        buttons6.addComponents(
            new MessageButton()
            .setCustomId(`tag6`)
            .setLabel("Leaver Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-leaverPluginEnable`)
            .setLabel(lang.get(interaction.guild.lang).settings['enable'])
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-leaverPluginDisable`)
            .setLabel(lang.get(interaction.guild.lang).settings['disable'])
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        var par = interaction.guild.channels.cache.find(channel =>channel.name == "leaver-plugin")
        if (par) {
            buttons6.components.forEach(button => {
                !button.customId.includes("tag") && button.disabled? button.disabled=false : button.disabled=true
            });
        }
        await channel.send({embeds: [zoneEmbed],components:[buttons1,buttons2]});
        await channel.send({embeds: [pluginEmbed],components:[buttons3,buttons4,buttons5,buttons6]});
    }
}
