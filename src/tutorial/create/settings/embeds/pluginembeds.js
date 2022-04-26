const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const zoneEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Zones creator")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Click here below for create new Zones","this will be helpfull")                
        const buttons1 = new MessageActionRow()
        buttons1.addComponents(
            new MessageButton()
            .setCustomId(`h1`)
            .setLabel("Admin Zone:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-adminZoneEnable`)
            .setLabel("Create Admin Zone")
            .setStyle(`SECONDARY`),
        )
        const buttons2 = new MessageActionRow()
        buttons2.addComponents(
            new MessageButton()
            .setCustomId(`h2`)
            .setLabel("Ticket Zone:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-ticketZoneEnable`)
            .setLabel("Create Ticket Zone")
            .setStyle(`SECONDARY`),
        )
        const pluginEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Plugins Enabler")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Click here below for enable plugins","this will very usefull") 
        const buttons3 = new MessageActionRow()
        buttons3.addComponents(
            new MessageButton()
            .setCustomId(`h3`)
            .setLabel("Autorole Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-autorolePluginEnable`)
            .setLabel("Enable")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-autorolePluginDisable`)
            .setLabel("Disable")
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        const buttons4 = new MessageActionRow()
        buttons4.addComponents(
            new MessageButton()
            .setCustomId(`h4`)
            .setLabel("Twitch Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-twitchPluginEnable`)
            .setLabel("Enable")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-twitchPluginDisable`)
            .setLabel("Disable")
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        const buttons5 = new MessageActionRow()
        buttons5.addComponents(
            new MessageButton()
            .setCustomId(`h5`)
            .setLabel("Welcomer Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-welcomerPluginEnable`)
            .setLabel("Enable")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-welcomerPluginDisable`)
            .setLabel("Disable")
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        const buttons6 = new MessageActionRow()
        buttons6.addComponents(
            new MessageButton()
            .setCustomId(`h6`)
            .setLabel("Leaver Plugin:")
            .setStyle(`SECONDARY`)
            .setDisabled(true),
            new MessageButton()
            .setCustomId(`settings-bot-leaverPluginEnable`)
            .setLabel("Enable")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`settings-bot-leaverPluginDisable`)
            .setLabel("Disable")
            .setStyle(`DANGER`)
            .setDisabled(true),
        )
        await channel.send({embeds: [zoneEmbed],components:[buttons1,buttons2]});
        await channel.send({embeds: [pluginEmbed],components:[buttons3,buttons4,buttons5,buttons6]});
    }
}
