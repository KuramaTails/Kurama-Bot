const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('moderation')
		.setDescription('All moderation commands!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('addrole')
				.setDescription('Bot will add a song to queue!')
				.addStringOption(option =>option.setName("newlink").setDescription("Link or Title of song/playlist you want to add to queue").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('Bot will join your voice channel!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('clear')
				.setDescription('Select loop mode!')
				.addStringOption(option =>option.setName("mode").setDescription("Select a repeat mode : DISABLED = 0, SONG = 1 , QUEUE = 2").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('kick')
				.setDescription('Bot will pause playing!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('leaveds')
				.setDescription('Bot will play a song!')
				.addStringOption(option =>option.setName("link").setDescription("Link or Title of song/playlist you want to play").setRequired(true))
		)
		.addSubcommand(subcommand=>
			subcommand
				.setName('mute')
				.setDescription('Bot will play previous song again!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('poll')
				.setDescription('Bot will show the songs queue!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('removerole')
				.setDescription('Bot will leave your vocal channel!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('timeout')
				.setDescription("Bot will shuffle song's queue!")
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('unban')
				.setDescription('Bot will skip this song')
		),
	async execute(interaction) {
        const moderationCommand = require(`../commands/player/${interaction.options.getSubcommand()}`);
		moderationCommand.execute(interaction)
	},
};