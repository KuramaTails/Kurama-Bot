const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const fs= require('fs');
const dbconnect = require("../../../db/dbconnect");
const dbdisconnect = require("../../../db/dbdisconnect");
const welcomeSchema = require("../../../schemas/welcome-schema");

module.exports = {
	async execute(interaction,channel,lang) {
        await dbconnect()
        var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
        await dbdisconnect()
        const enablerWelcomer = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Welcomer enabler")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        const button1 = new MessageActionRow()
        switch (true) {
            case selectGuildWelcomer[0].activeWelcome == true:
                enablerWelcomer.addField(lang.get(interaction.guild.lang).update.welcomer["active"]+` \`${selectGuildWelcomer[0].activeWelcome}\``,lang.get(interaction.guild.lang).update.welcomer.embeds["activeDescOff"])
                button1.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomer-disableWelcomer`)
                    .setLabel(lang.get(interaction.guild.lang).update.welcomer.embeds["activeBtnOff"])
                    .setStyle(`SECONDARY`),
                )
                const channelEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Choose channel")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                .addField(lang.get(interaction.guild.lang).update.welcomer.embeds["chooseChannelDesc1"],lang.get(interaction.guild.lang).update.welcomer.embeds["chooseChannelDesc2"])
                const button2 = new MessageActionRow()
                button2.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('welcomer-selectWelcomerChannel')
                        .setPlaceholder(lang.get(interaction.guild.lang).update.welcomer.embeds["chooseChannelSelect"]) 
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
                const buttonWelcomertext = new MessageActionRow()
                textWelcomerEmbed.addField(lang.get(interaction.guild.lang).update.welcomer["text"]+` \`${selectGuildWelcomer[0].textWelcome}\``,lang.get(interaction.guild.lang).update.welcomer.embeds["changeTextEmbed"])
                buttonWelcomertext.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomer-textWelcomer`)
                    .setLabel(lang.get(interaction.guild.lang).update.welcomer.embeds["changeTextDesc"])
                    .setStyle(`SECONDARY`),
                )
                const backgroundEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Choose Background")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                .addField(lang.get(interaction.guild.lang).update.welcomer.embeds["chooseBackgroundDesc1"],lang.get(interaction.guild.lang).update.welcomer.embeds["chooseBackgroundDesc2"])
                const button3 = new MessageActionRow()
                button3.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('welcomer-selectWelcomerBackground')
                        .setPlaceholder(lang.get(interaction.guild.lang).update.welcomer.embeds["chooseBackgroundSelect"])
                )
                const background = fs.readdirSync('./src/settings/welcomer/backgrounds').filter(file => file.endsWith('.jpg'));
                background.forEach(image => {
                    var fullName = image.split(".")
                    button3.components[0].addOptions([
                        {
                            label: `${fullName[0]}`,
                            value: `./welcomer/${fullName[0]}`,
                        },
                    ])
                });
                await channel.send({embeds:[enablerWelcomer],components:[button1]})
                await channel.send({embeds:[channelEmbed],components:[button2]})
                await channel.send({embeds:[textWelcomerEmbed],components:[buttonWelcomertext]})
                await channel.send({embeds:[backgroundEmbed],components:[button3]})
                const Leaver = new MessageEmbed()
                .setColor('#0099ff')
                    .setTitle("Bot Kurama : Leaver enabler")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                const buttonLeaver = new MessageActionRow()
                switch (true) {
                    case selectGuildWelcomer[0].activeLeave == false:
                        Leaver.addField(lang.get(interaction.guild.lang).update.leaver["active"]+` \`${selectGuildWelcomer[0].activeLeave}\``,lang.get(interaction.guild.lang).update.leaver.embeds["activeDescOn"])
                        buttonLeaver.addComponents(
                            new MessageButton()
                            .setCustomId(`welcomer-enableLeaver`)
                            .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["activeBtnOn"])
                            .setStyle(`SECONDARY`),
                        )
                        await channel.send({embeds:[Leaver],components:[buttonLeaver]})
                    break;
                    default:
                        Leaver.addField(lang.get(interaction.guild.lang).update.leaver.embeds["activeDescOff"],lang.get(interaction.guild.lang).update.leaver.embeds["activeDescOff"])
                        buttonLeaver.addComponents(
                            new MessageButton()
                            .setCustomId(`welcomer-disableLeaver`)
                            .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["activeBtnOff"])
                            .setStyle(`SECONDARY`),
                        )
                        const textLeaverEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Bot Kurama : Leaver Text")
                        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                        const buttonLeavertext = new MessageActionRow()
                        textLeaverEmbed.addField(lang.get(interaction.guild.lang).update.leaver["text"]+` \`${selectGuildWelcomer[0].textLeave}\``,lang.get(interaction.guild.lang).update.leaver["changeTextEmbed"])
                        buttonLeavertext.addComponents(
                            new MessageButton()
                            .setCustomId(`welcomer-textLeaver`)
                            .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["changeTextDesc"])
                            .setStyle(`SECONDARY`),
                        )

                        await channel.send({embeds:[Leaver],components:[buttonLeaver]})
                        await channel.send({embeds:[textLeaverEmbed],components:[buttonLeavertext]})
                    break;
                }
            break;
            case selectGuildWelcomer[0].activeWelcome == false:
                enablerWelcomer.addField(lang.get(interaction.guild.lang).update.welcomer["active"]+` \`${selectGuildWelcomer[0].activeWelcome}\``,lang.get(interaction.guild.lang).update.welcomer.embeds["activeDescOn"])
                button1.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomer-enableWelcomer`)
                    .setLabel(lang.get(interaction.guild.lang).update.welcomer.embeds["activeBtnOn"])
                    .setStyle(`SECONDARY`),
                )
                await channel.send({embeds:[enablerWelcomer],components:[button1]})
            break;
        }
	}
};
