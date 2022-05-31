const { Modal, TextInputComponent, MessageActionRow } = require("discord.js");
const assistant = require("./assistant");

module.exports = {
	async execute(interaction,lang,customId) {
        switch (customId) {
            case "continue":
                var modal = new Modal()
                    .setCustomId('assistant')
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
        }
    }
}