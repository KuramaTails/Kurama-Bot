const { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const dbconnect = require('../../../../misc/db/dbconnect');
const dbdisconnnect = require('../../../../misc/db/dbdisconnect');
const autoroleSchema = require('../../../../schemas/autorole-schema');
module.exports = {
    async execute(interaction,channel,lang) {
        await dbconnect()
        var selectGuildAutorole = await autoroleSchema.find({ "_id" : interaction.guild.id})
        await dbdisconnnect()
        const enablerAutorole = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Autorole Enabler")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        const button1 = new MessageActionRow()
        if (selectGuildAutorole[0].active== false) {
            enablerAutorole.addField(lang.get(interaction.guild.lang).update.bot.embeds["activeTitle"]+` \`${selectGuildAutorole[0].active}\``,lang.get(interaction.guild.lang).update.bot.embeds["activeDescOn"])
            button1.addComponents(
                new MessageButton()
                .setCustomId(`bot-enableAutorole`)
                .setLabel(lang.get(interaction.guild.lang).update.bot.embeds["activeBtnOn"])
                .setStyle(`SECONDARY`),
            )
            await channel.send({embeds:[enablerAutorole],components:[button1]})
        }
        else {
            enablerAutorole.addField(lang.get(interaction.guild.lang).update.bot.embeds["activeTitle"]+` \`${selectGuildAutorole[0].active}\``,lang.get(interaction.guild.lang).update.bot.embeds["activeDescOff"])
            button1.addComponents(
                new MessageButton()
                .setCustomId(`bot-disableAutorole`)
                .setLabel(lang.get(interaction.guild.lang).update.bot.embeds["activeBtnOff"])
                .setStyle(`SECONDARY`),
            )

            const roleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Bot Kurama : Choose role")
            .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
            .addField(lang.get(interaction.guild.lang).update.bot.embeds["chooseRoleDesc1"],lang.get(interaction.guild.lang).update.bot.embeds["chooseRoleDesc2"])
            const button2 = new MessageActionRow()
            button2.addComponents(
                new MessageSelectMenu()
                    .setCustomId('bot-selectAutoroleRole')
                    .setPlaceholder(lang.get(interaction.guild.lang).update.bot.embeds["chooseRoleSelect"])
                    
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
            await channel.send({embeds:[enablerAutorole],components:[button1]})
            await channel.send({embeds:[roleEmbed],components:[button2]})

        }
    }
};