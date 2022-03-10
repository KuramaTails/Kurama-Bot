const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);


module.exports = {
	name: "timeout",
	ephemeral: "false",
    command:"Timeout",
    desc:"Timeout a user for some minutes",
    categ:"admin",
    example:"!timeout @User minutes",
	async execute(messageCreate, args) {
        var mentionedMember;
        var member = args[0].replace(/\D/g, "");
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        if (args[1] == "") { messageCreate.reply("Please provide timeout minutes"); return };
        try {
            mentionedMember = await messageCreate.guild.members.fetch(member);
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