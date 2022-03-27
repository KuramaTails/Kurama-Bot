const deletecooldown = require("../buttons/deletecooldown");

module.exports = {
	async execute(interaction,command,player,pollUser,pollCounter,cooldownUser) {
        switch (true) {
            case interaction.commandName=="poll":
                pollUser.clear(); 
                pollCounter = [0,0,0,0,0]
                await deletecooldown.execute(interaction,cooldownUser);
                await command.execute(interaction,pollCounter);
            break;
        
            default:
                await interaction.deferReply( {ephemeral: true});
                await deletecooldown.execute(interaction,cooldownUser);
                await command.execute(interaction,cooldownUser,player);
            break;
        }
	}
};