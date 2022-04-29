const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
	async execute(interaction,channel,lang) {
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).tutorial.part5["field1"],lang.get(interaction.guild.settings.lang).tutorial.part5["field2"])
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-bot-selectPlayerChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
                
        )
        var filteredChannels = interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
        var par = interaction.guild.channels.cache.find(channel =>channel.name.includes("Kurama"))
        if (par) par.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
        var par1 = interaction.guild.channels.cache.find(channel =>channel.name == "Ticket Zone")
        if (par1) par1.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
        var par2 = interaction.guild.channels.cache.find(channel =>channel.name == "Admin Zone")
        if (par2) par2.children.forEach(channel => filteredChannels.get(channel.id)? filteredChannels.delete(channel.id) : "")
        
        filteredChannels.forEach(channel => {
            button1.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        const chooseRoleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Choose Role Embed")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField(lang.get(interaction.guild.settings.lang).plugins.embeds.chooseRole["desc1"],lang.get(interaction.guild.settings.lang).plugins.embeds.chooseRole["desc2"])
        const button2 = new MessageActionRow()
        button2.addComponents(
            new MessageSelectMenu()
                .setCustomId('settings-bot-selectChooseRoleChannel')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
                
        )
        filteredChannels.forEach(channel => {
            button2.components[0].addOptions([
                {
                    label: `${channel.name}`,
                    value: `${channel.id}`,
                },
            ])
        });
        await channel.send({embeds:[TutorialEmbed],components:[button1]})
        await channel.send({embeds:[chooseRoleEmbed],components:[button2]})
    }
}
