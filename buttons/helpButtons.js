const adminEmbed = require('../embeds/adminEmbed')
const helpEmbed = require('../embeds/helpEmbed')
const generalEmbed = require('../embeds/generalEmbed')
const playerEmbed = require('../embeds/playerEmbed');
const helpBase = require('../feature/help');
const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	async execute(interaction,selMessage) {
        var pagNumber = 1
        if (selMessage.embeds[0].title.includes("/")) {
            switch (true) {
                case selMessage.embeds[0].title.includes("1/2"):
                    pagNumber = 1
                    break;
                case selMessage.embeds[0].title.includes("2/2"):
                    pagNumber = 2
                    break;
            }
        }
        
        var newButtons = new MessageActionRow()
        newButtons.addComponents(
        new MessageButton()
        .setCustomId(`Back`)
        .setLabel(`🔙 Back`)
        .setStyle("PRIMARY"),
        );
        newButtons.addComponents(
            new MessageButton()
            .setCustomId(`Up`)
            .setLabel(`🔼 Pag up`)
            .setStyle("PRIMARY")
            .setDisabled(true)
        );
        newButtons.addComponents(
            new MessageButton()
            .setCustomId(`Down`)
            .setLabel(`🔽 Pag Down`)
            .setStyle("PRIMARY")
            .setDisabled(true)
        );
		switch (interaction.customId) {
            case "Back":
                await helpBase.execute(selMessage)
                interaction.deferUpdate()
            break;
            case "Admin":
                await adminEmbed.execute(selMessage,newButtons)
                interaction.deferUpdate()
            break;
            case "General":
                await generalEmbed.execute(selMessage,newButtons)
                interaction.deferUpdate()
            break;
            case "Utility":
                await helpEmbed.execute(selMessage,newButtons)
                interaction.deferUpdate()
            break;
            case "Music Player":
                await playerEmbed.execute(selMessage,newButtons,pagNumber)
                interaction.deferUpdate()
            break;
            case "Down":
                switch (true) {
                    case selMessage.embeds[0].title.includes("Admin"):
                        pagNumber = pagNumber+1
                        await adminEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()    
                    break;
                    case selMessage.embeds[0].title.includes("General"):
                        pagNumber = pagNumber+1
                        await generalEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()
                    break;
                    case selMessage.embeds[0].title.includes("Utility"):
                        pagNumber = pagNumber+1
                        await helpEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()
                    break;
                    case selMessage.embeds[0].title.includes("Player"):
                        pagNumber = pagNumber+1
                        await playerEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()
                    break;
                }
            break;
            case "Up":
                switch (true) {
                    case selMessage.embeds[0].title.includes("Admin"):
                        pagNumber = pagNumber-1
                        await adminEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()    
                    break;
                    case selMessage.embeds[0].title.includes("General"):
                        pagNumber = pagNumber-1
                        await generalEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()
                    break;
                    case selMessage.embeds[0].title.includes("Utility"):
                        pagNumber = pagNumber-1
                        await helpEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()
                    break;
                    case selMessage.embeds[0].title.includes("Player"):
                        pagNumber = pagNumber-1
                        await playerEmbed.execute(selMessage,newButtons,pagNumber)
                        interaction.deferUpdate()
                    break;
                }
            break;
        }
	}
};


