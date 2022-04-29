const { MessageEmbed } = require("discord.js")

module.exports= {
    async execute(interaction,lang) {
        var fields = interaction.message.embeds[0].fields
        var noAction = interaction.message.embeds[0]
        noAction.description= lang.get(interaction.guild.settings.lang).zones.adminZone.resolved["desc"]+ "`" + interaction.values[0] + "`"
        interaction.message.edit({embeds:[noAction],components:[]})
        switch (interaction.values[0]) {
            case "skip":
            break;
            case "falsereport":
                var action = require(`./commands/${interaction.values[0]}`)
            break;
            default:
                var action = require(`../moderation/commands/${interaction.values[0]}`)
            break;
        }
        await interaction.deferUpdate()
        if (action) {
            await action.execute(interaction,lang,fields)
            const reportedUser = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Log Kurama : Warning")
            .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
            .setDescription(`<@${interaction.user.id}> has used ${interaction.values[0]} on a ${fields[1].value} report`)
            var warnChannel = interaction.guild.channels.cache.find(channel=> channel.name == "warn")
            warnChannel.send({embeds:[reportedUser]})
        }
    }
}