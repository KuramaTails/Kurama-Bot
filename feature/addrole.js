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
        .setTimestamp()
        .setFooter({ text: "Click on the title for complete documentation", iconURL: 'https://i.imgur.com/AfFp7pu.png'  });

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
                .then(async embedMessage => {
                    embedMessage.react("👍");
                    embedMessage.react("👎");
                    const filter = (reaction, user) => {
                        console.log(user.id)
                        return reaction.emoji.name === '👍' && user.id === messageCreate.author.id;
                        
                    };
                    
                    const collector = embedMessage.createReactionCollector({filter, time: 5000 });
                    
                    collector.on('collect', async (reaction, user) => {
                        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                    });
                    
                    collector.on('end', async collected => {   
                        const reaction1 = await embedMessage.reactions.resolve('👍').users.fetch(messageCreate.author.id);
                        if (!reaction1.get(messageCreate.author.id))
                        {
                            console.log("no reactions")
                        }
                        else {
                            console.log("reactions")
                        }
                    });

                });
                
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
    }
};