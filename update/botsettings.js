const { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const autoroleSchema = require('../schemas/autorole-schema');

module.exports = {
    async execute(interaction,) {
        var selectGuildAutorole = await autoroleSchema.find({ "_id" : interaction.guild.id})
        var selectChannel = await interaction.guild.channels.resolve(interaction.channelId)
        var selectedMessage = await selectChannel.messages.resolve(interaction.message.id)
        var updateEmbed = selectedMessage.embeds[0]
        updateEmbed.fields[0].name = `Leaver set to \`${selectGuildAutorole[0].active}\``
        const newButton = new MessageActionRow()
        if (selectGuildAutorole[0].active==true) {
            updateEmbed.fields[0].value = "Click button below to disable"
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`bot-disableAutorole`)
                .setLabel("🔴Disable")
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]}).then(async ()=>{
                const roleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Choose role")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                .addField("Please select a role:","this will be added automatically when members join ")
                const button2 = new MessageActionRow()
                button2.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('bot-selectAutoroleRole')
                        .setPlaceholder('Nothing selected')
                        
                )
                var roles = await interaction.guild.roles.cache
                roles.forEach(role => {
                    button2.components[0].addOptions([
                        {
                            label: `${role.name}`,
                            value: `${role.id}`,
                        },
                    ])
                });
                await selectChannel.send({embeds:[roleEmbed],components:[button2]})
            })
        } else {
            updateEmbed.fields[0].value = "Click button below to enable"
            newButton.addComponents(
                new MessageButton()
                .setCustomId(`bot-enableAutorole`)
                .setLabel("🟢Enable")
                .setStyle(`SECONDARY`),
            )
            await selectedMessage.edit({embeds:[updateEmbed],components:[newButton]})
            var fetchedMessages = await selectChannel.messages.fetch()
            fetchedMessages.find(async message=>{
                if(message.embeds[0].title == "Bot Kurama : Choose role") {
                    await message.delete()
                    return
                }
            })
        }
    }
};