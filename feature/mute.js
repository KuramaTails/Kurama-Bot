const { Permissions } = require('discord.js');
const {args} = require("../bot.js");
const permissions = new Permissions([
	Permissions.FLAGS.VIEW_CHANNEL,
	Permissions.FLAGS.EMBED_LINKS,
	Permissions.FLAGS.ATTACH_FILES,
	Permissions.FLAGS.READ_MESSAGE_HISTORY,
	Permissions.FLAGS.MANAGE_ROLES,
    Permissions.FLAGS.SEND_MESSAGES,
]);


module.exports = {
	name: "mute",
	ephemeral: "false",
    command:"Mute",
    desc:'Gives "Muted" role to quoted user',
    example:"!mute userId minutes",
	async execute(messageCreate, args) {
        var mentionedMember;
        const duration = [...args]
        duration.shift(1);
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        try {
            mentionedMember = await messageCreate.guild.members.fetch(args[0]);
            if (mentionedMember.permissions.has(permissions)) {
                messageCreate.reply("You can't mute an Administrator!");
                return;
            }
            else {
                var muted = messageCreate.guild.roles.cache.find(role => role.name === 'Muted')
                if (mentionedMember.roles.cache.has(muted)) {
                    return;
                }
                else {
                    mentionedMember.roles.add(muted);
                    messageCreate.reply(`${mentionedMember} was muted`)
                    setTimeout( unmute ,duration * 60 * 1000);
                    function unmute() {
                        mentionedMember.roles.remove(muted);
                        messageCreate.reply(`${mentionedMember} has been unmuted`)
                    }  
                }
                
                
            }
        }
        catch (e) {
            messageCreate.reply("No member found"); 
            return;
        }
	},
};