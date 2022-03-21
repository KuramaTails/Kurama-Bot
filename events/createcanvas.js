const Canvas = require ('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports = {
    async execute(member,welcomeText,selectedChannel,welcomeBackground,add) {
        const canvas = Canvas.createCanvas(700,250);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage(`./welcomer/${welcomeBackground}.jpg`);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#ffffff';
        context.lineWidth = 5;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        if (add==true) {
            context.fillText('Welcome!', canvas.width / 2.5, canvas.height / 3.5);
        }
        else {
            context.fillText('Oh no!', canvas.width / 2.5, canvas.height / 3.5);
        }

        context.font = applyText(canvas, `${member.user.username}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${member.user.username}`, canvas.width / 2.5, canvas.height / 1.8);

        context.font = '22px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(`${welcomeText}`, canvas.width / 2.5, canvas.height / 1.4);
        
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);  
                

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        const embed = new MessageEmbed()
        if (add==true) {
            embed.setColor('#36393e')
            .setDescription(`Welcome <@${member.user.id}> . You are the ${member.guild.memberCount}th member !`)
            .setImage('attachment://profile-image.png');
        }
        else {
            embed.setColor('#36393e')
            .setDescription(`<@${member.user.id}> leaved. We now have ${member.guild.memberCount} members left!`)
            .setImage('attachment://profile-image.png');
        }
        
        selectedChannel.send({embeds: [embed],files: [attachment] });
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