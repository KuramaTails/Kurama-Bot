const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
module.exports = {
    async execute(interaction) {
        /*await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Welcomer")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Do you want to activate the welcomer?","Welcome message will be send when new members will join")
        const button1 = new MessageActionRow()
        button1.addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                ]),
        );
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})*/
    }
};