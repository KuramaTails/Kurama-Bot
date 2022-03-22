const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
    async execute(interaction) {
        await interaction.message.delete()
        const TutorialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Set up player")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .addField("Please select a text channel:this will be used by the music player to send messages ","Warning: Embed messages will be sent in this channel with all the buttons needed to use the music player without the need for text commands")
        const button1 = new MessageActionRow()
        /*
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
                ])
        )*/
        interaction.channel.send({embeds:[TutorialEmbed],components:[button1]})
    }
};