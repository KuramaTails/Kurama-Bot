const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription("Set all Bot's options!")
		.addSubcommand(subcommand =>
			subcommand
				.setName('welcome')
				.setDescription('Bot will add a song to queue!')
                .addBooleanOption(option =>option.setName("active").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addChannelOption(option =>option.setName("channel").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addStringOption(option =>option.setName("text").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addBooleanOption(option =>option.setName("leaver").setDescription("Link or Title of song/playlist you want to add to queue"))
                .addStringOption(option =>option.setName("textleaver").setDescription("Link or Title of song/playlist you want to add to queue"))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('player')
				.setDescription('Bot will join your voice channel!')
				.addChannelOption(option =>option.setName("channel").setDescription("Link or Title of song/playlist you want to add to queue"))

		),
	async execute(interaction,cooldownUser,player) {
        const setCommands = require(`../commands/set/${interaction.options.getSubcommand()}`);
		try {
			setCommands.execute(interaction)
		} catch (error) {
			await interaction.deferUpdate()
		}
		setTimeout(() => {
			cooldownUser.delete(interaction.user.id);
		}, 3*1000);
	},
};

