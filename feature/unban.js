const { Permissions } = require('discord.js');
const {args} = require("../bot.js");
const permissions = new Permissions([
	Permissions.FLAGS.VIEW_CHANNEL,
	Permissions.FLAGS.EMBED_LINKS,
	Permissions.FLAGS.ATTACH_FILES,
	Permissions.FLAGS.READ_MESSAGE_HISTORY,
	Permissions.FLAGS.MANAGE_ROLES,
]);


module.exports = {
	name: "unban",
	ephemeral: "false",
	async execute(messageCreate, args) {
        var mentionedMemberId; 
        const banList = await messageCreate.guild.bans.fetch();
        const bannedUser = banList.find(user => user.id === mentionedMemberId);
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };    
        mentionedMemberId = args[0];
        if (bannedUser)
            {
                messageCreate.guild.members.unban(mentionedMemberId);
                messageCreate.reply(`${mentionedMemberId} was unbanned `);
            }
            else {
                messageCreate.reply(`${mentionedMemberId} is not a banned user `)
            }
        
	},
};