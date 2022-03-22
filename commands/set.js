const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription("Set all Bot's options!")
		.addSubcommand(subcommand =>
			subcommand
				.setName('welcome')
				.setDescription('Bot will add a song to queue!')
                .addBooleanOption(option =>option.setName("activewelcome").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addChannelOption(option =>option.setName("channel").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addStringOption(option =>option.setName("textwelcome").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addStringOption(option =>option.setName("background").setDescription("Link or Title of song/playlist you want to add to queue"))
				
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('leave')
				.setDescription('Bot will add a song to queue!')
                .addBooleanOption(option =>option.setName("activeleave").setDescription("Link or Title of song/playlist you want to add to queue"))
				.addStringOption(option =>option.setName("textleave").setDescription("Link or Title of song/playlist you want to add to queue"))
				
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('player')
				.setDescription('Bot will join your voice channel!')
				.addChannelOption(option =>option.setName("channel").setDescription("Link or Title of song/playlist you want to add to queue"))

		),
	async execute(interaction,cooldownUser) {
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

