const adminEmbed = require('./embeds/admin')
const baseEmbed = require('./embeds/base');
const playerEmbed = require('./embeds/player');
const { MessageButton, MessageActionRow } = require('discord.js');


module.exports = {
	async execute(interaction,lang,category) {
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
        .setCustomId(`help-Back`)
        .setLabel(`🔙 `+ lang.get(interaction.guild.lang).commands.help.buttons["btnBack"])
        .setStyle("PRIMARY"),
        );
        newButtons.addComponents(
            new MessageButton()
            .setCustomId(`help-Up`)
            .setLabel(`🔼 `+lang.get(interaction.guild.lang).commands.help.buttons["btnPageUp"])
            .setStyle("PRIMARY")
            .setDisabled(true)
        );
        newButtons.addComponents(
            new MessageButton()
            .setCustomId(`help-Down`)
            .setLabel(`🔽 `+lang.get(interaction.guild.lang).commands.help.buttons["btnPageDown"])
            .setStyle("PRIMARY")
            .setDisabled(true)
        );
		switch (category) {
            case "Back":
                await baseEmbed.execute(interaction,lang)
            break;
            case "Admin":
                await adminEmbed.execute(interaction,newButtons,pagNumber)
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


