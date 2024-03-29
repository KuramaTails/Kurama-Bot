const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('moderation')
		.setDescription('All moderation commands!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('addrole')
				.setDescription('Bot will add a role to mentioned user!')
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
				.addRoleOption(role =>role.setName("role").setDescription("Select a role from this discord").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('Bot will ban mentioned user from your discord!')
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
				.addStringOption(reason =>reason.setName("reason").setDescription("Select a reason for the ban"))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('clear')
				.setDescription('Bot will clear selected messages!')
				.addNumberOption(number =>number.setName("number").setDescription("Select the amount of nessages to clear (maximum 100!)").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('clearwarn')
				.setDescription('Bot will clear warn!')
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord"))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('kick')
				.setDescription('Bot will kick mentioned user from your discord!')
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
				.addStringOption(reason =>reason.setName("reason").setDescription("Select a reason for the ban"))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('leaveds')
				.setDescription('Bot will leave your discord!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('removerole')
				.setDescription('Bot will remove a role to mentioned user!')
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
				.addRoleOption(role =>role.setName("role").setDescription("Select a role from this discord").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('timeout')
				.setDescription("Bot will timeout mentioned user from your discord!")
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
				.addNumberOption(option =>option.setName("duration").setDescription("Select how many minutes will be muted this user").setRequired(true))
				/*.addChoice("1 Minute", 1)
				.addChoice("5 Minutes", 5)
				.addChoice("10 Minutes", 10)
				.addChoice("1 Hour", 60)
				.addChoice("1 Day", 60*24)
				.addChoice("1 Week", 60*24*7)*/
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('unban')
				.setDescription('Bot will unban mentioned user from your discord')
				.addUserOption(user =>user.setName("user").setDescription("Select a user from this discord").setRequired(true))
		),
	async execute(interaction,player,lang) {
        const moderationCommand = require(`./commands/${interaction.options.getSubcommand()}`);
		try {
			moderationCommand.execute(interaction,lang)
		} catch (error) {
			await interaction.deferUpdate()
		}
	},
};