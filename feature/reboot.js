const { clientId, guildId, token } = require('../config.json');
module.exports = {
	name: "reboot",
	ephemeral: "false",
    command:"Reboot",
    desc:'Reboot bot',
    example:"!reboot",
	async execute(messageCreate) {
        await messageCreate.client.destroy();
        messageCreate.client.login(token);
        messageCreate.reply("Bot is rebooting");
	},
};