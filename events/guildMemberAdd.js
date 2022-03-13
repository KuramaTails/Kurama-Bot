const Canvas = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports = {
    async execute(member) {
        let members = await member.guild.members.fetch()
        var memberskeys = Array.from(members.keys())
        var memberCount = member.guild.memberCount 
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./welcomer/canvas.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText('Welcome!', canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(canvas, `${member.user.username}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${member.user.username}`, canvas.width / 2.5, canvas.height / 1.8);

        context.font = '22px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText('Please read #rules-channel first!', canvas.width / 2.5, canvas.height / 1.4);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);  
                
        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        const embed = new MessageEmbed() // Create A New Embed
                        .setColor('#36393e')
                        .setDescription(`Welcome <@${member.user.id}> . You are the ${memberCount}th member !`)
                        .setImage('attachment://profile-image.png');
        
        
        let onlineMembers = []
        let offlineMembers = []
        for (let i = 0; i < memberskeys.length; i++) {
            try {
                switch (members.get(memberskeys[i]).presence.status) {
                    case "online":
                        onlineMembers.push(members.get(memberskeys[i]))
                    break;
                    case "idle":
                        onlineMembers.push(members.get(memberskeys[i]))
                    break;    
                    case "dnd":
                        onlineMembers.push(members.get(memberskeys[i]))
                    break;    
                    case "offline":
                        offlineMembers.push(members.get(memberskeys[i]))
                    break;
                }
            } catch (error) {
                offlineMembers.push(members.get(memberskeys[i]))
            }
        }
        var oldOnlineMembers = onlineMembers.length
        var oldOfflineMembers = offlineMembers.lengthù
        try {
            if (oldMember.status=="online"){
                oldOnlineMembers=oldOnlineMembers+1
                oldOfflineMembers=oldOfflineMembers-1
            }
            else {
                oldOnlineMembers=oldOnlineMembers-1
                oldOfflineMembers=oldOfflineMembers+1
            }
        } catch (error) {
            console.log(error)
        }
        var listchannels = member.guild.channels.cache
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (true) {
                case listchannels.get(keyschannels[i]).name.includes("Member"):
                listchannels.get(keyschannels[i]).setName(`Member : ${memberCount}`)
                console.log(`Member : ${memberCount}`)
                break;
                case listchannels.get(keyschannels[i]).name.includes("Online"):
                listchannels.get(keyschannels[i]).setName(`Online : ${onlineMembers.length}`)
                console.log(`Online : ${onlineMembers.length}`)
                break;
                case listchannels.get(keyschannels[i]).name.includes("Offline"):
                listchannels.get(keyschannels[i]).setName(`Offline : ${offlineMembers.length}`)
                console.log(`Offline : ${offlineMembers.length}`)
                break;
                case listchannels.get(keyschannels[i]).name.includes("welcome"):
                var welcomeChannel = listchannels.get(keyschannels[i]).id
                member.guild.channels.cache.get(welcomeChannel).send({embeds: [embed],files: [attachment] });
                break;
            }	
        }
        var roles = guild.roles.cache
        var keysRoles = Array.from(roles.keys())
        for (let i = 0; i < keysRoles.length; i++) {
            if (roles.get(keysRoles[i]).name == "Member") {
                var selrole = roles.get(keysRoles[i])
                member.roles.add(selrole)
            }
        }	
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