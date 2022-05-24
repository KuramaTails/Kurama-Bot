const { MessageActionRow, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const playerbuttons = require("./playerbuttons")

module.exports = {
	async execute(interaction,player,lang,customId,playerUser) {
        var voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.reply({
                content: lang.get(interaction.guild.settings.lang).player.commands.errors["memberJoin"],
                ephemeral: true
            })
        }
        switch (customId) {
            case "search":
                var modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(lang.get(interaction.guild.settings.lang).player.modal["title"]);
                var textInput = new TextInputComponent()
                    .setCustomId('textInput')
                    .setLabel(lang.get(interaction.guild.settings.lang).player.modal["label"])
                    .setPlaceholder(lang.get(interaction.guild.settings.lang).player.modal["placeholder"])
                    .setStyle('SHORT');
                const firstActionRow = new MessageActionRow().addComponents(textInput);
		        modal.addComponents( firstActionRow);
                await interaction.showModal(modal);
            break;
            default:
                playerbuttons.execute(interaction,player,lang,customId,playerUser)
            break;
        }
    }
}