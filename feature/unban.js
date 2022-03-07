const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);


module.exports = {
	name: "unban",
	ephemeral: "false",
    command:"Unban",
    desc:"Unban previous banned members",
    example:"!unban userId",
	async execute(messageCreate, args) {
        var mentionedMemberId; 
        const banList = await messageCreate.guild.bans.fetch();
        const bannedUser = banList.find(user => user.id === mentionedMemberId);
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
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