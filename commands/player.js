const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('player')
		.setDescription('All player commands!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('addsong')
				.setDescription('Bot will add a song to queue!')
				.addStringOption(option =>option.setName("link").setDescription("Link or Title of song/playlist you want to add to queue").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('join')
				.setDescription('Bot will join your voice channel!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('loop')
				.setDescription('Select loop mode!')
				.addStringOption(option =>option.setName("mode").setDescription("Select a repeat mode : DISABLED = 0, SONG = 1 , QUEUE = 2").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('pause')
				.setDescription('Bot will pause playing!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('play')
				.setDescription('Bot will play a song!')
				.addStringOption(option =>option.setName("link").setDescription("Link or Title of song/playlist you want to play").setRequired(true))
		)
		.addSubcommand(subcommand=>
			subcommand
				.setName('queue')
				.setDescription('Bot will play previous song again!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('resume')
				.setDescription('Bot will show the songs queue!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('leave')
				.setDescription('Bot will leave your vocal channel!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('shuffle')
				.setDescription("Bot will shuffle song's queue!")
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('skip')
				.setDescription('Bot will skip this song')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('volume')
				.setDescription("Select player's volume!")
				.addNumberOption(option =>option.setName("volume").setDescription("Set volume percentage").setRequired(true))
		),
	async execute(interaction,player) {
        const playerCommand = require(`../commands/player/${interaction.options.getSubcommand()}`);
		playerCommand.execute(interaction,player)
	},
};