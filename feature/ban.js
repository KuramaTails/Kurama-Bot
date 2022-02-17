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
	name: "ban",
	ephemeral: "false",
    command:"Ban",
    desc:"You can ban a user from this server",
    example:"!ban userId reason",
	async execute(messageCreate, args) {
        var mentionedMember;
        const reason = [...args];
        reason.shift(1);       
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        if (reason.length<1) { messageCreate.reply("Please provide a reason"); return;}
        const formattedReason = reason.toString()
        .replace(",", " ")
        .replace("[", " ")
        .replace("]", " ")
        .trim();    
        try {
            mentionedMember = await messageCreate.guild.members.fetch(args[0]);
            if (mentionedMember.permissions.has(permissions)) {
                messageCreate.reply("You can't ban an Administrator!");
                return;
            }
            else {
                await mentionedMember.send(`You have been banned from ${messageCreate.guild } for ${formattedReason }.`)
                await mentionedMember.ban();
                messageCreate.reply(`${mentionedMember} was banned for ${formattedReason }`);
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
	},
};