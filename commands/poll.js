const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a poll!')
        .addStringOption(title =>title.setName("title").setDescription("Title of poll").setRequired(true))
        .addStringOption(option1 =>option1.setName("option1").setDescription("Set an option for this poll").setRequired(true))
        .addStringOption(option2 =>option2.setName("option2").setDescription("Set an option for this poll").setRequired(true))
        .addStringOption(option3 =>option3.setName("option3").setDescription("Set an option for this poll"))
        .addStringOption(option4 =>option4.setName("option4").setDescription("Set an option for this poll"))
        .addStringOption(option5 =>option5.setName("option5").setDescription("Set an option for this poll")),

	async execute(interaction,poolCounter) {
        let title = interaction.options.getString("title")
        var listOptions = []
        listOptions.push(interaction.options.getString("option1"))
        listOptions.push(interaction.options.getString("option2"))
        listOptions.push(interaction.options.getString("option3"))
        listOptions.push(interaction.options.getString("option4"))
        listOptions.push(interaction.options.getString("option5"))
            
        
        var optionButton = new MessageActionRow()
        const poll = new MessageEmbed() 
            .setColor('#0099ff')
            .setTitle(`**__Poll__**`)
            .setDescription(`***${title}*** \n\n You have 30 seconds to reply to this poll \n **Poll created by** *${interaction.user}* \n`)
            for (let i = 0; i < listOptions.length; i++) {
                if (listOptions[i]!= null) {
                    poll.addFields(
                        { name: `Option ${i+1}` , value: listOptions[i], inline: true },
                        { name: '\u200B', value: "\u200B", inline: true },
                        { name: '\u200B', value: "\u200B", inline: true }
                    ) 
                    optionButton.addComponents(
                        new MessageButton()
                        .setCustomId(`Option ${i+1}`)
                        .setLabel(listOptions[i])
                        .setStyle("SECONDARY"),
                        );
                }
            }  
            interaction.reply({ embeds: [poll] , components:[optionButton],ephemeral: false})
            setTimeout(() => {
                const resultspoll = new MessageEmbed() // Create A New Embed
                .setColor('#0099ff')
                .setTitle(`**__Poll__**`)
                .setDescription(`Poll ended! Thank you for your participation.\nFollowing are the results:`)
                for (let i = 0; i < listOptions.length; i++) {
                    if (listOptions[i]!= null) {
                        resultspoll.addFields(
                            { name: `${listOptions[i]}` , value: `${poolCounter[i]}`, inline: true },
                            { name: '\u200B', value: "\u200B", inline: true },
                            { name: '\u200B', value: "\u200B", inline: true }
                        )
                    }
                }
                interaction.editReply({embeds: [resultspoll], components: []})
            }, 30*1000);
		
	},
};