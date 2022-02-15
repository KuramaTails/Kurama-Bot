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
	name: "kick",
	ephemeral: "false",
	async execute(messageCreate, args) {
        var mentionedMember;
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        try {
            mentionedMember = await messageCreate.guild.members.fetch(args[0]);
            if (mentionedMember.permissions.has(permissions)) {
                messageCreate.reply("You can't kick an Administrator!");
                return;
            }
            else {
                mentionedMember.kick();
                messageCreate.reply(`${mentionedMember} was kicked`);
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
	},
};