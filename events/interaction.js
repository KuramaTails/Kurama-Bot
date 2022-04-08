const deletecooldown = require("../buttons/deletecooldown");
const isbutton = require("../interactions/isbutton");
const iscommand = require("../interactions/iscommand");
const isselectmenu = require("../interactions/isselectmenu");
module.exports = {
    name: 'interactionCreate',
	async execute(interaction,player,lang,cooldownUser,bot,pollUser,pollCounter,playerUser) {
        if (cooldownUser.has(interaction.user.id)) {
            await interaction.deferReply( {ephemeral: true});
            await interaction.followUp({ content: "Please wait for cooldown to end", ephemeral: true });
            return
        }
        try {
            cooldownUser.set(interaction.user.id, true);
            if (interaction.isButton()) {
                await isbutton.execute(interaction,bot,player,pollUser,pollCounter,lang,playerUser)
            }
            if (interaction.isCommand()) {
                pollUser.clear(); 
                pollCounter = [0,0,0,0,0]
                const command = bot.commands.get(interaction.commandName);
                await iscommand.execute(interaction,command,player,pollCounter,lang)
            }
            if(interaction.isSelectMenu()) {
                await isselectmenu.execute(interaction,lang)
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } finally {
            deletecooldown.execute(interaction,cooldownUser)
        }
	}
};
