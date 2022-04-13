const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "report",
    command:"report",
    desc:'You can report a user to admin!',
    example:"/moderation report",
	async execute(interaction,lang) {
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
            value: interaction.options.getUser("reaction")? interaction.options.getUser("reaction") : undefined
        }
        const reportEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Report")
        .setDescription("Status: Open")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        fieldArr.forEach(element => {
            element.value? element.name=="Reported in"? reportEmbed.addFields({ name: element.name , value: "<#"+element.value+">", inline: false }) : reportEmbed.addFields({ name: element.name , value: "<@"+element.value+">", inline: false }) : ""
        });
        const menu = new MessageActionRow()
        menu.addComponents(
            new MessageSelectMenu()
                .setCustomId('report-ActionSelector')
                .setPlaceholder(lang.get(interaction.guild.lang).tutorial["selectPlayerChannel"])
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
        var selectedChannel = interaction.guild.channels.cache.find(channel => channel.name == "reports")
        interaction.followUp({
            content: "Thank you for helping us!",
            ephemeral: true
        })
        selectedChannel.send({embeds:[reportEmbed],components:[menu]})
    }
};