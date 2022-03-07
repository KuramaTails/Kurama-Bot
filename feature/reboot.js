const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
module.exports = {
	name: "reboot",
	ephemeral: "false",
    command:"Reboot",
    desc:'Reboot bot',
    example:"!reboot",
	async execute(messageCreate) {
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        await messageCreate.client.destroy();
        messageCreate.client.login(token);
        messageCreate.reply("Bot is rebooting");
	},
};