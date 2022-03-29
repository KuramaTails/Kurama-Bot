const { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require('../db/dbdisconnect');
const autoroleSchema = require('../schemas/autorole-schema');
module.exports = {
    async execute(interaction,) {
        await dbconnect()
        var selectGuildAutorole = await autoroleSchema.find({ "_id" : interaction.guild.id})
        await dbdisconnnect()
        var channels = await interaction.guild.channels.fetch()
        var settingsChannel = channels.find(c => c.name == "bot-settings" && c.type == "GUILD_TEXT")
        const enablerAutorole = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Autorole Enabler")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        const button1 = new MessageActionRow()
        if (selectGuildAutorole[0].active== false) {
            enablerAutorole.addField(`Autorole set to \`${selectGuildAutorole[0].active}\``,"Click button below to enable")
            button1.addComponents(
                new MessageButton()
                .setCustomId(`bot-enableAutorole`)
                .setLabel("🟢Enable")
                .setStyle(`SECONDARY`),
            )
            await settingsChannel.send({embeds:[enablerAutorole],components:[button1]})
        }
        else {
            enablerAutorole.addField(`Autorole set to \`${selectGuildAutorole[0].active}\``,"Click button below to disable")
            button1.addComponents(
                new MessageButton()
                .setCustomId(`bot-disableAutorole`)
                .setLabel("🔴Disable")
                .setStyle(`SECONDARY`),
            )

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
            await settingsChannel.send({embeds:[enablerAutorole],components:[button1]})
            await settingsChannel.send({embeds:[roleEmbed],components:[button2]})

        }
    }
};