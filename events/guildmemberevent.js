const Canvas = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const welcomeSchema = require('../schemas/welcome-schema');
const dbconnect = require('./dbconnect');
const cache = {}
module.exports = {
    async execute(member,add) {
        let data = cache[member.guild.id]
        if (!data) {
            console.log("Fetching from db")
            await dbconnect().then( async mongoose => {
                try {
                    const result = await welcomeSchema.findOne({_id:member.guild.id})
                    if (result) {
                        cache[member.guild.id] = data = [result.active,result.channelId,result.text,result.leaver,result.leavertext]
                    }
                    else {
                        console.log(`No data set for ${member.guild.name}`)
                        
                    }
                } finally {
                    mongoose.connection.close()
                    console.log("Closing connection to database")
                }
            })
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i]==null){
                return console.log(`Welcomer hasn't been set in ${member.guild.name}`)
            }
        }
        const active= data[0]
        const channelId = data[1]
        const text= data[2]
        const leaver = data[3]
        const leavertext= data[4]
        if (add==true && active == false) {
            return console.log("Welcomer disabled in this guild")
        }
        if (add==false && leaver == false) {
            return console.log("Leaver disabled in this guild")
        }
        let members = await member.guild.members.fetch()
        var memberskeys = Array.from(members.keys())
        var memberCount = memberskeys.length 
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./welcomer/canvas.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        if (add===true) {
            context.font = '28px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('Welcome!', canvas.width / 2.5, canvas.height / 3.5);
        }
        else {
            context.font = '28px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('Oh no!', canvas.width / 2.5, canvas.height / 3.5);
        }



        context.font = applyText(canvas, `${member.user.username}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${member.user.username}`, canvas.width / 2.5, canvas.height / 1.8);

        if (add===true) {
            context.font = '22px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText(`${text}`, canvas.width / 2.5, canvas.height / 1.4);
        }
        else {
            context.font = '22px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText(`${leavertext}`, canvas.width / 2.5, canvas.height / 1.4);
        }
        
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);  
                

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        const embed = new MessageEmbed()
        if (add===true) {
            embed.setColor('#36393e')
            .setDescription(`Welcome <@${member.user.id}> . You are the ${memberCount}th member !`)
            .setImage('attachment://profile-image.png');
            let selrole = member.guild.roles.cache.find(command => command.name === "👤Member")
            member.roles.add(selrole)
        }
        else {
            embed.setColor('#36393e')
            .setDescription(`<@${member.user.id}> just left this discord. There are now ${memberCount} members !`)
            .setImage('attachment://profile-image.png');
        }
        
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
        var oldOfflineMembers = offlineMembers.length
        try {
            if (member.status=="online"){
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

        try {
            var listchannels = member.guild.channels.cache
            let memberChannel = await listchannels.find(channel => channel.name.includes("Member"))
            let onlineChannel = await listchannels.find(channel => channel.name.includes("Online"))
            let offlineChannel = await listchannels.find(channel => channel.name.includes("Offline"))
            let welcomeChannel = await listchannels.find(channel => channel.id === channelId )
            memberChannel.setName(`Member : ${memberCount}`)
            onlineChannel.setName(`Online : ${onlineMembers.length}`)
            offlineChannel.setName(`Offline : ${offlineMembers.length}`)
            welcomeChannel.send({embeds: [embed],files: [attachment] });
        } catch (error) {
            console.log(error)
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