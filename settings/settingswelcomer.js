const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const fs= require('fs');
const dbconnect = require("../db/dbconnect")
const dbdisconnnect = require("../db/dbdisconnnect")
const welcomeSchema = require("../schemas/welcome-schema");

module.exports = {
	async execute(interaction,channel,selectedMessages) {
        if (!selectedMessages) { selectedMessages=5}
        try {
            channel.bulkDelete(selectedMessages)
        } catch (error) {
            console.log(error)
        }
        await dbconnect()
        var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
        await dbdisconnnect()
        switch (selectedMessages) { 
            case 1:
                var Leaver = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Leaver enabler")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                var buttonLeaver = new MessageActionRow()
                Leaver.addField(`Leaver set to \`${selectGuildWelcomer[0].activeLeave}\``,"Click button below to disable")
                    buttonLeaver.addComponents(
                        new MessageButton()
                        .setCustomId(`disableLeaver`)
                        .setLabel("🔴Disable")
                        .setStyle(`SECONDARY`),
                    )
                    await channel.send({embeds:[Leaver],components:[buttonLeaver]})

                    var textLeaverEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Bot Kurama : Leaver Text")
                        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                    var buttonLeavertext = new MessageActionRow()
                    textLeaverEmbed.addField(`Leaver text set to \`${selectGuildWelcomer[0].textLeave}\``,"Click button below to change it")
                    buttonLeavertext.addComponents(
                        new MessageButton()
                        .setCustomId(`textLeaver`)
                        .setLabel("Change text Leaver")
                        .setStyle(`SECONDARY`),
                    )
                    await channel.send({embeds:[textLeaverEmbed],components:[buttonLeavertext]})
            break;
            case 2:
                var Leaver = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Leaver enabler")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                var buttonLeaver = new MessageActionRow()
                Leaver.addField(`Leaver set to \`${selectGuildWelcomer[0].activeLeave}\``,"Click button below to enable")
                buttonLeaver.addComponents(
                    new MessageButton()
                    .setCustomId(`enableLeaver`)
                    .setLabel("🟢Enable")
                    .setStyle(`SECONDARY`),
                )
                await channel.send({embeds:[Leaver],components:[buttonLeaver]})
            break;
            case 5:
                const enablerWelcomer = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Welcomer enabler")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                const button1 = new MessageActionRow()
                if (selectGuildWelcomer[0].activeWelcome== false) {
                    enablerWelcomer.addField(`Welcomer set to \`${selectGuildWelcomer[0].activeWelcome}\``,"Click button below to enable")
                    button1.addComponents(
                        new MessageButton()
                        .setCustomId(`enableWelcomer`)
                        .setLabel("🟢Enable")
                        .setStyle(`SECONDARY`),
                    )
                    await channel.send({embeds:[enablerWelcomer],components:[button1]})
                }
                else {
                    enablerWelcomer.addField(`Welcomer set to \`${selectGuildWelcomer[0].activeWelcome}\``,"Click button below to disable")
                    button1.addComponents(
                        new MessageButton()
                        .setCustomId(`disableWelcomer`)
                        .setLabel("🔴Disable")
                        .setStyle(`SECONDARY`),
                    )

                    const channelEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Bot Kurama : Choose channel")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                    .addField("Please select a text channel:this will be used by the welcomer to send messages when members join ","(Tip: Select welcome if previously created)")
                    const button2 = new MessageActionRow()
                    button2.addComponents(
                        new MessageSelectMenu()
                            .setCustomId('selectWelcomerChannel')
                            .setPlaceholder('Nothing selected')
                            
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
                
                    var textWelcomerEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Bot Kurama : Welcomer Text")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                    var buttonWelcomertext = new MessageActionRow()
                    textWelcomerEmbed.addField(`Welcome text set to \`${selectGuildWelcomer[0].textWelcome}\``,"Click button below to change it")
                    buttonWelcomertext.addComponents(
                        new MessageButton()
                        .setCustomId(`textWelcomer`)
                        .setLabel("Change text Welcomer")
                        .setStyle(`SECONDARY`),
                    )

                    const backgroundEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Bot Kurama : Choose Background")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                    .addField("Please select a background:this will be used by the welcomer to send messages when members join ","(Tip: Select welcome if previously created)")
                    const button3 = new MessageActionRow()
                    button3.addComponents(
                        new MessageSelectMenu()
                            .setCustomId('selectWelcomerBackground')
                            .setPlaceholder('Nothing selected')
                            
                    )
                    const background = fs.readdirSync('./welcomer').filter(file => file.endsWith('.jpg'));
                    background.forEach(image => {
                        button3.components[0].addOptions([
                            {
                                label: `${image}`,
                                value: `./welcomer/${image}`,
                            },
                        ])
                    });

                    
                    await channel.send({embeds:[enablerWelcomer],components:[button1]})
                    await channel.send({embeds:[channelEmbed],components:[button2]})
                    await channel.send({embeds:[textWelcomerEmbed],components:[buttonWelcomertext]})
                    await channel.send({embeds:[backgroundEmbed],components:[button3]})

                    var Leaver = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Bot Kurama : Leaver enabler")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                    var buttonLeaver = new MessageActionRow()
                    if (selectGuildWelcomer[0].activeLeave== false) {
                        Leaver.addField(`Leaver set to \`${selectGuildWelcomer[0].activeLeave}\``,"Click button below to enable")
                        buttonLeaver.addComponents(
                            new MessageButton()
                            .setCustomId(`enableLeaver`)
                            .setLabel("🟢Enable")
                            .setStyle(`SECONDARY`),
                        )
                        await channel.send({embeds:[Leaver],components:[buttonLeaver]})
                    }
                    else {
                        Leaver.addField(`Leaver set to \`${selectGuildWelcomer[0].activeLeave}\``,"Click button below to disable")
                        buttonLeaver.addComponents(
                            new MessageButton()
                            .setCustomId(`disableLeaver`)
                            .setLabel("🔴Disable")
                            .setStyle(`SECONDARY`),
                        )
                        
                        var textLeaverEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Bot Kurama : Leaver Text")
                        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                        var buttonLeavertext = new MessageActionRow()
                        textLeaverEmbed.addField(`Leaver text set to \`${selectGuildWelcomer[0].textLeave}\``,"Click button below to change it")
                        buttonLeavertext.addComponents(
                            new MessageButton()
                            .setCustomId(`textLeaver`)
                            .setLabel("Change text Leaver")
                            .setStyle(`SECONDARY`),
                        )

                        await channel.send({embeds:[Leaver],components:[buttonLeaver]})
                        await channel.send({embeds:[textLeaverEmbed],components:[buttonLeavertext]})
                    }
                }
            break;
        }
	}
};
