const { MessageButton, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs= require('fs');
const welcomeSchema = require('../schemas/welcome-schema');

module.exports = {
	async execute(interaction,lang) {
        var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
        var selectChannel = await interaction.guild.channels.resolve(interaction.channelId)
        var selectedMessage = await selectChannel.messages.resolve(interaction.message.id)
        var updateEmbed = selectedMessage.embeds[0]
        updateEmbed.fields[0].name = lang.get(interaction.guild.lang).update.welcomer["active"]+` \`${selectGuildWelcomer[0].activeWelcome}\``
        const newButton = new MessageActionRow()
        if (selectGuildWelcomer[0].activeWelcome==true) {
            updateEmbed.fields[0].value = lang.get(interaction.guild.lang).update.welcomer.embeds["activeDescOff"]
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`welcomer-disableWelcomer`)
                .setLabel(lang.get(interaction.guild.lang).update.welcomer.embeds["activeBtnOff"])
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]}).then(async ()=>{
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
                const background = fs.readdirSync('./welcomer').filter(file => file.endsWith('.jpg'));
                background.forEach(image => {
                    var fullName = image.split(".")
                    button3.components[0].addOptions([
                        {
                            label: `${fullName[0]}`,
                            value: `./welcomer/${fullName[0]}`,
                        },
                    ])
                });
                await selectChannel.send({embeds:[channelEmbed],components:[button2]})
                await selectChannel.send({embeds:[textWelcomerEmbed],components:[buttonWelcomertext]})
                await selectChannel.send({embeds:[backgroundEmbed],components:[button3]})
                const Leaver = new MessageEmbed()
                .setColor('#0099ff')
                    .setTitle("Bot Kurama : Leaver enabler")
                    .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                const buttonLeaver = new MessageActionRow()
                Leaver.addField(lang.get(interaction.guild.lang).update.leaver["text"]+` \`${selectGuildWelcomer[0].activeLeave}\``,lang.get(interaction.guild.lang).update.leaver.embeds["activeDescOn"])
                buttonLeaver.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomer-enableLeaver`)
                    .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["activeBtnOn"])
                    .setStyle(`SECONDARY`),
                )
                await selectChannel.send({embeds:[Leaver],components:[buttonLeaver]})
            })
        } else {
            updateEmbed.fields[0].value = lang.get(interaction.guild.lang).update.welcomer.embeds["activeDescOn"]
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`welcomer-enableWelcomer`)
                .setLabel(lang.get(interaction.guild.lang).update.welcomer.embeds["activeBtnOn"])
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]})
            var fetchedMessages = await selectChannel.messages.fetch()
            var toDeleteList = []
            fetchedMessages.forEach(async message=>{
                if(message.embeds[0].fields[0].name != lang.get(interaction.guild.lang).update.welcomer["active"]+` \`${selectGuildWelcomer[0].activeWelcome}\``) {
                    await toDeleteList.push(message)
                }
            })
            await selectChannel.bulkDelete(toDeleteList)
        }
	}
};