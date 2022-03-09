const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);


module.exports = {
	name: "mute",
	ephemeral: "false",
    command:"Mute",
    desc:'Gives "Muted" role to quoted user',
    example:"!mute userId minutes",
	async execute(messageCreate, args) {
        var mentionedMember;
        var member = args[0].replace(/\D/g, "");
        const duration = [...args]
        duration.shift(1);
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        if (args.length === 0) { messageCreate.reply("Please provide an ID"); return };
        try {
            mentionedMember = await messageCreate.guild.members.fetch(member);
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