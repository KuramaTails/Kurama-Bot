const { Modal, TextInputComponent, showModal } = require('discord-modals')
module.exports= {
    async execute(interaction,bot,customId,title,label,placeHolder) {
        var modal = new Modal()
        .setCustomId(customId)
        .setTitle(title)
        .addComponents([
            new TextInputComponent()
                .setCustomId('textinput-customid')
                .setLabel(label)
                .setStyle('SHORT') 
                .setMinLength(1)
                .setMaxLength(1024)
                .setPlaceholder(placeHolder)
                .setRequired(true) 
            ]);
        showModal(modal, {
            client: bot, 
            interaction: interaction 
            })
    }
}
