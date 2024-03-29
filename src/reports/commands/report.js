
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "report",
    command:"report",
    desc:'You can report a user to admin!',
    example:"/moderation report",
	async execute(interaction,lang) {
        var selectedChannel = interaction.guild.channels.cache.find(channel => channel.name == "reports")
        if (!selectedChannel) {
            return interaction.followUp({
            content: 'reports are not activated in this discord. Pls contact an admin to let him inform about this',
            ephemeral: true
            })
        }
        interaction.followUp({
            content: lang.get(interaction.guild.settings.lang).zones.adminZone.reports.commands["optReport"],
            ephemeral: true
        })
        var fieldArr = []
        fieldArr[0] = {
            name: "Reported Member",
            value: interaction.options.getUser("user").id
        }
        fieldArr[1] = {
            name: "Reported By",
            value: interaction.user.id
        }
        fieldArr[2] = {
            name: "Reported in",
            value: interaction.channel
        }
        fieldArr[3] = {
            name: "Reason",
            value: interaction.options.getString("reason")
        }
        const reportEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Report")
        .setDescription("Status: Open")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        fieldArr.forEach(element => {
            if (element.value) {
                switch (element.name) {
                    case "Reported Member":
                    case "Reported By":
                        reportEmbed.addFields({ name: element.name , value: "<@"+element.value+">", inline: false })
                    break;
                    case "Reported in":
                        reportEmbed.addFields({ name: element.name , value: "<#"+element.value+">", inline: false })
                    break;
                    case "Reason":
                        reportEmbed.addFields({ name: element.name , value: element.value, inline: false })
                    break;
                }  
            }
        });
        const menu = new MessageActionRow()
        menu.addComponents(
            new MessageSelectMenu()
                .setCustomId('report-ActionSelector')
                .setPlaceholder(lang.get(interaction.guild.settings.lang).selectMenu["none"])
                .addOptions([
                    {
                        label: `Warn`,
                        value: `warn`,
                    },
                ])
                .addOptions([
                    {
                        label: `Kick`,
                        value: `kick`,
                    },
                ])
                .addOptions([
                    {
                        label: `Ban`,
                        value: `ban`,
                    },
                ])
                .addOptions([
                    {
                        label: `Ignore`,
                        value: `skip`,
                    },
                ])
                .addOptions([
                    {
                        label: `Warn Reporter`,
                        value: `falsereport`,
                    },
                ])

        )
        selectedChannel.send({embeds:[reportEmbed],components:[menu]})
    }
};