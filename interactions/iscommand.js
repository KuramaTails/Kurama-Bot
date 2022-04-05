module.exports = {
	async execute(interaction,command,player,pollCounter,lang) {
        switch (true) {
            case interaction.commandName=="poll":
                await command.execute(interaction,pollCounter,lang);
            break;
            default:
                await interaction.deferReply( {ephemeral: true});
                await command.execute(interaction,player,lang);
            break;
        }
	}
};