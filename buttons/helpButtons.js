const adminEmbed = require('../embeds/adminEmbed')
const helpEmbed = require('../embeds/helpEmbed')
const generalEmbed = require('../embeds/generalEmbed')
const playerEmbed = require('../embeds/playerEmbed');
const helpBase = require('../feature/help');
const { MessageButton } = require('discord.js');

module.exports = {
	async execute(interaction,selMessage) {
        var helpButtons = interaction.message.components[0]
        var helpButtonsOld = interaction.message.components[0]
        if (helpButtons.components[0].customId!= "Back") {
            helpButtons.spliceComponents(0,0,[
            new MessageButton()
            .setCustomId(`Back`)
            .setLabel(`🔙 Back`)
            .setStyle("PRIMARY"),
            ]);
            selMessage.edit({components: [helpButtons] });
        }
		switch (interaction.customId) {
            case "Back":
                helpButtonsOld.spliceComponents(0,1)
                await helpBase.execute(selMessage,helpButtonsOld)
                interaction.deferUpdate()
            break;
            case "Admin":
                helpButtons.spliceComponents(1,1)
                await adminEmbed.execute(selMessage,helpButtons)
                interaction.deferUpdate()
            break;
            case "General":
                helpButtons.spliceComponents(2,1)
                await generalEmbed.execute(selMessage,helpButtons)
                interaction.deferUpdate()
            break;
            case "Utility":
                helpButtons.spliceComponents(3,1)
                await helpEmbed.execute(selMessage,helpButtons)
                interaction.deferUpdate()
            break;
            case "Music player":
                helpButtons.spliceComponents(4,1)
                await playerEmbed.execute(selMessage,helpButtons)
                interaction.deferUpdate()
            break;
            /*case "⬆":
                await adminEmbed.execute(selMessage,1)
                interaction.deferUpdate()
            break;
            case "⬇":
                await adminEmbed.execute(selMessage,2)
                interaction.deferUpdate()
            break;
            case "⬅":
                await helpHome.execute(selMessage)
                interaction.deferUpdate()
            break;*/
        }
	}
};


