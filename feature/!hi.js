module.exports = {
	name: "!hi",
	ephemeral: "false",
	async execute(messageCreate) {
		await messageCreate.reply('hi');
		},
	};