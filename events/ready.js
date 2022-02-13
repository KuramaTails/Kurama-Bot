module.exports = {
	name: 'ready',
	once: true,
	execute(bot) {
		console.log(`Ready! Logged in ${bot.guildId } as ${bot.user.tag}`);
	},
};