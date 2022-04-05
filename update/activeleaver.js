const { MessageButton, MessageEmbed, MessageActionRow} = require('discord.js');
const welcomeSchema = require('../schemas/welcome-schema');

module.exports = {
	async execute(interaction,lang) {
        var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
        var selectChannel = await interaction.guild.channels.resolve(interaction.channelId)
        var selectedMessage = await selectChannel.messages.resolve(interaction.message.id)
        var updateEmbed = selectedMessage.embeds[0]
        updateEmbed.fields[0].name = lang.get(interaction.guild.lang).update.leaver["active"]+` \`${selectGuildWelcomer[0].activeLeave}\``
        const newButton = new MessageActionRow()
        if (selectGuildWelcomer[0].activeLeave==true) {
            updateEmbed.fields[0].value = lang.get(interaction.guild.lang).update.leaver.embeds["activeDescOff"]
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`welcomer-disableLeaver`)
                .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["activeBtnOff"])
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]}).then(async ()=>{
                const textLeaverEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Leaver Text")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                const buttonLeavertext = new MessageActionRow()
                textLeaverEmbed.addField(lang.get(interaction.guild.lang).update.leaver["text"]+` \`${selectGuildWelcomer[0].textLeave}\``,lang.get(interaction.guild.lang).update.leaver.embeds["changeTextEmbed"])
                buttonLeavertext.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomer-textLeaver`)
                    .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["changeTextDesc"])
                    .setStyle(`SECONDARY`),
                )
                await selectChannel.send({embeds:[textLeaverEmbed],components:[buttonLeavertext]})
            })
        } else {
            updateEmbed.fields[0].value = lang.get(interaction.guild.lang).update.leaver.embeds["activeDescOn"]
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`welcomer-enableLeaver`)
                .setLabel(lang.get(interaction.guild.lang).update.leaver.embeds["activeBtnOn"])
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]})
            var fetchedMessages = await selectChannel.messages.fetch()
            fetchedMessages.find(async message=>{
                if(message.embeds[0].title == "Bot Kurama : Leaver Text") {
                    await message.delete()
                    return
                }
            })
        }
	}
};