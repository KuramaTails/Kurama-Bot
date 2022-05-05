const Canvas = require ('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs= require('fs');

module.exports = {
    async execute(member,selectedChannel,add,lang) {
        var guildSettings = member.guild.settings
        var title = add? lang.get(guildSettings.lang).welcomer.canvas["join"] : lang.get(guildSettings.lang).welcomer.canvas["leave"]
        var text = add? guildSettings.plugins.welcomerPlugin.textWelcomer : guildSettings.plugins.leaverPlugin.textLeaver
        var desc = add? lang.get(guildSettings.lang).welcomer.canvas['descWelcome'] : lang.get(guildSettings.lang).welcomer.canvas['descLeave']
        var result = desc.replace("${member.user.id}",`${member.user.id}`);
        result = result.replace("${member.guild.memberCount}",`${member.guild.memberCount}`);
        var repDesc = result
        var pathBackground = guildSettings.plugins.welcomerPlugin.background
        const canvas = Canvas.createCanvas(700,250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage(pathBackground+".jpg");
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#ffffff';
        context.lineWidth = 5;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(title, canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(canvas, `${member.user.username}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${member.user.username}`, canvas.width / 2.5, canvas.height / 1.8);

        context.font = '22px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(text, canvas.width / 2.5, canvas.height / 1.4);
        
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);  
                

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        const embed = new MessageEmbed()
        embed.setColor('#36393e')
        .setDescription(repDesc)
        .setImage('attachment://profile-image.png');
        await selectedChannel.send({embeds: [embed],files: [attachment] });
    }
};
   
   
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;
	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);
	return context.font;
};