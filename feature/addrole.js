const { Permissions, MessageEmbed } = require('discord.js');
const { TIMEOUT } = require('dns');
const fs= require('fs');
const { features } = require('process');
const {args} = require("../bot.js");
const permissions = new Permissions([
	Permissions.FLAGS.VIEW_CHANNEL,
	Permissions.FLAGS.EMBED_LINKS,
	Permissions.FLAGS.ATTACH_FILES,
	Permissions.FLAGS.READ_MESSAGE_HISTORY,
	Permissions.FLAGS.MANAGE_ROLES,
]);


module.exports = {
	name: "addrole",
	ephemeral: "false",
    command:"Addrole",
    desc:"You can add a role to a user from this server",
    example:"!addrole userId",
	async execute(messageCreate, args, discord , bot) {
        var mentionedMember;
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Add Role')
        .setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(`Choose a reaction for adding <@${args}> a role`)
        var roles = await messageCreate.guild.roles.fetch()
        let keys = Array.from( roles.keys() );
        if (keys.length<10){
            var emojilist = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
        }
        else {
            messageCreate.reply("There was an error. Please contact an Admin")
        }
        
        for (let i = 1; i < keys.length; i++) {
            roles.get(keys[i]).emoji = emojilist[i]
            exampleEmbed.addFields(
                { name: "Emoji" , value: roles.get(keys[i]).emoji, inline: true },
                { name: 'Description', value: roles.get(keys[i]).name, inline: true },
                { name: '\u200B', value: "\u200B", inline: true }
            )
        }
        
        
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        try {
            mentionedMember = await messageCreate.guild.members.fetch(args[0]);
            if (mentionedMember.permissions.has(permissions)) {
                messageCreate.reply("You can't add a role to an Administrator!");
                return;
            }
            else {
                messageCreate.reply({ embeds: [exampleEmbed] })
                for (let i = 1; i < keys.length; i++) {
                    exampleEmbed.react(roles.get(keys[i]).emoji);
                    
                }
                    setTimeout(async () => {
                        const reaction1 = await embedMessage.reactions.resolve('👍').users.fetch();
                        const reaction2 = await embedMessage.reactions.resolve('👎').users.fetch();
                        const reaction3 = await embedMessage.reactions.resolve('✌️').users.fetch();
                        const reaction4 = await embedMessage.reactions.resolve('🤘').users.fetch();
                        if (!reaction1.get(messageCreate.author.id))
                        {
                            if (!reaction2.get(messageCreate.author.id))
                            {
                                if (!reaction3.get(messageCreate.author.id))
                                {
                                    if (!reaction4.get(messageCreate.author.id))
                                    {
                                        console.log("no reactions")
                                    }
                                    else {
                                        console.log("reaction 4")
                                    }
                                }
                                else {
                                    console.log("reaction 3")
                                }
                            }
                            else {
                                console.log("reaction 2")
                            }
                        }
                        else {
                            console.log("reaction 1")
                        }
                    }, 5000);             
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
        

    }
};