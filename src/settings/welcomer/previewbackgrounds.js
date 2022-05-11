const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fs= require('fs');
module.exports = {
	async execute(interaction,lang,part,msg) {
        const background = fs.readdirSync('./src/welcomer/backgrounds').filter(file => file.endsWith('.jpg'));
        if (part<0) part=background.length-1
        if (part>background.length-1) part=0
        const startEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`Backgrounds Preview (${part+1}/${background.length})`)
		.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Documentation : Commands', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        const attachment = new MessageAttachment('./src/welcomer/backgrounds/'+background[part], 'preview.png');
        startEmbed.setImage(`attachment://preview.png`);
        const btn = new MessageActionRow()
		btn.addComponents(
            new MessageButton()
            .setCustomId(`settings-welcomer-preview-Back`)
            .setLabel(`🔙 `+ lang.get(interaction.guild.settings.lang).commands.help.buttons["btnBack"])
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId(`settings-welcomer-preview-Next`)
            .setLabel(`➡`+ lang.get(interaction.guild.settings.lang).commands.help.buttons["btnBack"])
            .setStyle("PRIMARY"),
        );
        msg? await interaction.followUp({embeds: [startEmbed],components:[btn],files: [attachment] , ephemeral: true }) : await interaction.editReply({embeds: [startEmbed],components:[btn],files: [attachment] , ephemeral: true })
        
	}
};