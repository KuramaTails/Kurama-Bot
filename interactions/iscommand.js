module.exports = {
	async execute(interaction,command,player,pollCounter) {
        switch (true) {
            case interaction.commandName=="poll":
                await command.execute(interaction,pollCounter);
            break;
            default:
                await interaction.deferReply( {ephemeral: true});
                await command.execute(interaction,player);
            break;
        }
	}
};