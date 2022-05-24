const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports= {
    async execute(interaction,lang,customId) {
        switch (customId) {
            case "textLeaver":
                var modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin.modal["title"]);
                var textInput = new TextInputComponent()
                    .setCustomId('textInput')
                    .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin.modal["label"])
                    .setPlaceholder(lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin.modal["placeholder"])
                    .setStyle('SHORT');
                var firstActionRow = new MessageActionRow().addComponents(textInput);
                modal.addComponents(firstActionRow);
                await interaction.showModal(modal);
            return
        }
    }
}