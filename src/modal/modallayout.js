const { Modal, TextInputComponent, showModal } = require('discord-modals')
module.exports= {
    async execute(interaction,bot,customId,title,label,placeholder) {
        var modal = new Modal()
        .setCustomId("modal-"+customId)
        .setTitle(title)
        .addComponents([
            new TextInputComponent()
                .setCustomId('textinput-customid')
                .setLabel(label)
                .setStyle('SHORT') 
                .setMinLength(1)
                .setMaxLength(1024)
                .setPlaceholder(placeholder)
                .setRequired(true) 
            ]);
        await showModal(modal, {
            client: bot, 
            interaction: interaction 
            })
    }
}
