const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);

module.exports = {
	name: "clear",
	ephemeral: "false",
	command:"Clear",
	desc:"Clear chat",
    categ:"utility",
    example:"!clear <max 100 messages>",
	async execute(messageCreate, args) {
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        const fetched = args;
        if (fetched<101){
            const selected = await messageCreate.channel.messages.fetch(fetched);
            messageCreate.channel.bulkDelete(selected,true);
        }
        else {
            messageCreate.reply("Please select less then 100 messages")
        }
    }
};