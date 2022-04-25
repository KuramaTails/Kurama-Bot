const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
    async execute(interaction,channel,lang) {
        const roleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Bot Kurama : Choose role")
            .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
            .addField(lang.get(interaction.guild.lang).update.bot.embeds["chooseRoleDesc1"],lang.get(interaction.guild.lang).update.bot.embeds["chooseRoleDesc2"])
            const selectMenu = new MessageActionRow()
            selectMenu.addComponents(
                new MessageSelectMenu()
                    .setCustomId('settings-autorole-selectAutoroleRole')
                    .setPlaceholder(lang.get(interaction.guild.lang).update.bot.embeds["chooseRoleSelect"])
                    
            )
            var roles = await interaction.guild.roles.cache
            roles.forEach(role => {
                selectMenu.components[0].addOptions([
                    {
                        label: `${role.name}`,
                        value: `${role.id}`,
                    },
                ])
            });
            await channel.send({embeds:[roleEmbed],components:[selectMenu]})
    }
};