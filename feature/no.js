module.exports = {
	name: "no",
	ephemeral: "false",
	async execute(messageCreate) {
		await messageCreate.reply('no');
		},
	};