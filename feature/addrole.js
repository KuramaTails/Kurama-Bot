const { Permissions, MessageEmbed } = require('discord.js');
const { TIMEOUT } = require('dns');
const fs= require('fs');
const { features } = require('process');
const {args} = require("../bot.js");
const { clientId, guildId, token } = require('../config.json');
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
	async execute(messageCreate, args,bot) {
        await messageCreate.client.destroy();
        messageCreate.client.login(token);
        await messageCreate.client.channels.fetch('942439391647899701')
        try {
            var mentionedMember = await messageCreate.guild.members.fetch(args[0],true);
        } catch (error) {
            messageCreate.reply("No member found"); 
            return;
        }
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Add Role')
        .setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(`Choose a reaction for adding <@${args}> a role`)
        var roles = await messageCreate.guild.roles.fetch()
        let keys = Array.from( roles.keys() );
        const filteredkeys = []
        for (let i = 0; i < keys.length; i++) {
            if (! await mentionedMember.roles.cache.has(keys[i])) {
                if (!roles.get(keys[i]).managed)
                {
                    filteredkeys.push(keys[i])
                }
                
            }
        }
        if (filteredkeys.length==0) {
            messageCreate.reply("No roles can be added to this user")
            return
        }
        if (filteredkeys.length<10){
            var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
        }
        else {
            messageCreate.reply("There was an error. Please contact an Admin")
        }
        for (let i = 0; i < filteredkeys.length; i++) {
            roles.get(filteredkeys[i]).emoji = emojilist[i]
            exampleEmbed.addFields(
                { name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
                { name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
                { name: '\u200B', value: "\u200B", inline: true }
            )
        }
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        try {
            if (mentionedMember.permissions.has(permissions)) {
                messageCreate.reply("You can't add a role to an Administrator!");
                return;
            }
            else {
                var addedroles = []
                messageCreate.reply({ embeds: [exampleEmbed] })
                .then(embedMessage => {
                    for (let i = 0; i < filteredkeys.length; i++) {
                        embedMessage.react(roles.get(filteredkeys[i]).emoji);  
                    }
                    setTimeout(async () => {
                        for (let i = 0; i < filteredkeys.length; i++) {
                            var counter = await embedMessage.reactions.resolve(roles.get(filteredkeys[i]).emoji).users.fetch();
                            if (counter.get(messageCreate.author.id)){
                                var selrole = messageCreate.guild.roles.cache.find(role => role.name === roles.get(filteredkeys[i]).name)
                                mentionedMember.roles.add(selrole);
                                addedroles.push(roles.get(filteredkeys[i]).name) 
                            }
                        }
                        if(addedroles.length>=1)
                        {
                            messageCreate.reply(`Role(s) ${addedroles} added for user <@${args}>`)
                        }
                        else {
                            messageCreate.reply(`No roles added to user <@${args}>`)

                        }
                        
                    }, 7000);   
                });               
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
    }
};