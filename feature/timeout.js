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
	name: "timeout",
	ephemeral: "false",
	async execute(messageCreate, args) {
        var mentionedMember;
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        if (args[1] == "") { messageCreate.reply("Please provide timeout minutes"); return };
        try {
            mentionedMember = await messageCreate.guild.members.fetch(args[0]);
            if (mentionedMember.permissions.has(permissions)) {
                messageCreate.reply("You can't timeout an Administrator!");
                return;
            }
            else {
                mentionedMember.timeout(args[1]* 60 * 1000);
                messageCreate.reply(`${mentionedMember} was timed out for ${args[1]}`);
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
	},
};