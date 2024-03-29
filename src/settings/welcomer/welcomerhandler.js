const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const dbconnect = require("../../db/dbconnect")
const dbdisconnect = require("../../db/dbdisconnect")
const guildSchema = require("../../schemas/guild-schema")
const previewbackgrounds = require("./previewbackgrounds")
module.exports= {
    async execute(interaction,lang,customId,plugins) {
        welcomerPlugin = plugins.welcomerPlugin
        await dbconnect()
        switch (customId) {
            case "textWelcomer":
                var modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["title"]);
                var textInput = new TextInputComponent()
                    .setCustomId('textInput')
                    .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["label"])
                    .setPlaceholder(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["placeholder"])
                    .setStyle('SHORT');
                var firstActionRow = new MessageActionRow().addComponents(textInput);
                modal.addComponents(firstActionRow);
                await interaction.showModal(modal);
            return;
            case "urlBackground":
                var modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["title"]);
                var textInput = new TextInputComponent()
                    .setCustomId('textInput')
                    .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["label"])
                    .setPlaceholder(lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin.modal["placeholder"])
                    .setStyle('SHORT');
                var firstActionRow = new MessageActionRow().addComponents(textInput);
                modal.addComponents(firstActionRow);
                await interaction.showModal(modal);
            return;
            case "textColor":
                var selectedColor = interaction.message.components[1].components[0].options.find(option => option.value == interaction.values[0])
                var updatePlaceholder = interaction.message.components[1]
                updatePlaceholder.components[0].placeholder= selectedColor.label
                await interaction.message.edit({components:[interaction.message.components[0],updatePlaceholder]})
                welcomerPlugin.textColor = interaction.values[0]
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                    }, {
                        $set: {
                            "plugins.welcomerPlugin.textColor": interaction.values[0],
                        }
                    },
                    {
                        upsert:true,
                    })
                await interaction.reply({
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerChannelSet"]+selectedColor.label,
                    ephemeral: true
                })
            return;
            case "selectWelcomerChannel":
                var selectedChannel = interaction.guild.channels.cache.find(channel => channel.id == interaction.values[0])
                if (!selectedChannel) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= selectedChannel.name
                await interaction.message.edit({components:[updatePlaceholder]})
                welcomerPlugin.channelId = interaction.values[0]
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                    }, {
                        $set: {
                            "plugins.welcomerPlugin.channelId": interaction.values[0],
                        }
                    },
                    {
                        upsert:true,
                    })
                interaction.followUp({
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerChannelSet"]+selectedChannel.name,
                    ephemeral: true
                })
            break;
            case "selectWelcomerBackground":
                var str = interaction.values[0].split('/');
                if (!str[str.length-1]) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= str[str.length-1]
                await interaction.message.edit({components:[updatePlaceholder,interaction.message.components[1]]})
                welcomerPlugin.background = interaction.values[0]+'.jpg'
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                    }, {
                        $set: {
                            "plugins.welcomerPlugin.background": interaction.values[0]+'.jpg',
                        }
                    },
                    {
                        upsert:true,
                    })
                interaction.followUp({
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerBackgroundSet"]+str[str.length-1],
                    ephemeral: true
                })
            break;
            case "previewBackgrounds":
                await previewbackgrounds.execute(interaction,lang,0,true)
            return;
            case "preview":
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(interaction.message.embeds[0].title)
                var splitParts = matches? matches[1].split("/") : ""
                var tutorialPart = splitParts? parseInt(splitParts[0]) : ""
                interaction.customId.includes('Next')? await previewbackgrounds.execute(interaction,lang,tutorialPart,false) : await previewbackgrounds.execute(interaction,lang,tutorialPart-2,false)
            return;
        }
        await dbdisconnect()
    }
}