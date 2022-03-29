const adminEmbed = require('../embeds/admin')
const baseEmbed = require('../embeds/base');
const helpEmbed = require('../embeds/help')
const generalEmbed = require('../embeds/general')
const playerEmbed = require('../embeds/player');
const { MessageButton, MessageActionRow } = require('discord.js');


module.exports = {
	async execute(interaction) {
        var pagNumber = 1
        if (interaction.message.embeds[0].title.includes("/")) {
            switch (true) {
                case interaction.message.embeds[0].title.includes("1/2"):
                    pagNumber = 1
                    break;
                case interaction.message.embeds[0].title.includes("2/2"):
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
                await baseEmbed.execute(interaction)
            break;
            case "Admin":
                await adminEmbed.execute(interaction,newButtons)
            break;
            case "General":
                await generalEmbed.execute(interaction,newButtons)
            break;
            case "Utility":
                await helpEmbed.execute(interaction,newButtons)
            break;
            case "Music Player":
                await playerEmbed.execute(interaction,newButtons,pagNumber)
            break;
            case "Down":
                switch (true) {
                    case interaction.message.embeds[0].title.includes("Admin"):
                        pagNumber = pagNumber+1
                        await adminEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                    case interaction.message.embeds[0].title.includes("General"):
                        pagNumber = pagNumber+1
                        await generalEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                    case interaction.message.embeds[0].title.includes("Utility"):
                        pagNumber = pagNumber+1
                        await helpEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                    case interaction.message.embeds[0].title.includes("Player"):
                        pagNumber = pagNumber+1
                        await playerEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                }
            break;
            case "Up":
                switch (true) {
                    case interaction.message.embeds[0].title.includes("Admin"):
                        pagNumber = pagNumber-1
                        await adminEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                    case interaction.message.embeds[0].title.includes("General"):
                        pagNumber = pagNumber-1
                        await generalEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                    case interaction.message.embeds[0].title.includes("Utility"):
                        pagNumber = pagNumber-1
                        await helpEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                    case interaction.message.embeds[0].title.includes("Player"):
                        pagNumber = pagNumber-1
                        await playerEmbed.execute(interaction,newButtons,pagNumber)
                    break;
                }
            break;
        }
	}
};


