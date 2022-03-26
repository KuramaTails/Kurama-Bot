const { MessageButton, MessageEmbed, MessageActionRow} = require('discord.js');
const welcomeSchema = require('../schemas/welcome-schema');

module.exports = {
	async execute(interaction) {
        var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
        var selectChannel = await interaction.guild.channels.resolve(interaction.channelId)
        var selectedMessage = await selectChannel.messages.resolve(interaction.message.id)
        var updateEmbed = selectedMessage.embeds[0]
        updateEmbed.fields[0].value = "Click button below to enable"
        updateEmbed.fields[0].name = `Leaver set to \`${selectGuildWelcomer[0].activeLeave}\``
        const newButton = new MessageActionRow()
        if (selectGuildWelcomer[0].activeLeave==true) {
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`welcomer-disableLeaver`)
                .setLabel("🔴Disable")
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]}).then(async ()=>{
                const textLeaverEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Leaver Text")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                const buttonLeavertext = new MessageActionRow()
                textLeaverEmbed.addField(`Leaver text set to \`${selectGuildWelcomer[0].textLeave}\``,"Click button below to change it")
                buttonLeavertext.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomer-textLeaver`)
                    .setLabel("Change text Leaver")
                    .setStyle(`SECONDARY`),
                )
                await selectChannel.send({embeds:[textLeaverEmbed],components:[buttonLeavertext]})
            })
        } else {
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`welcomer-enableLeaver`)
                .setLabel("🟢Enable")
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