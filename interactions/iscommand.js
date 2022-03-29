const deletecooldown = require("../buttons/deletecooldown");

module.exports = {
	async execute(interaction,command,player,pollUser,pollCounter) {
        switch (true) {
            case interaction.commandName=="poll":
                pollUser.clear(); 
                pollCounter = [0,0,0,0,0]
                await command.execute(interaction,pollCounter);
            break;
        
            default:
                await interaction.deferReply( {ephemeral: true});
                await command.execute(interaction,player);
            break;
        }
	}
};