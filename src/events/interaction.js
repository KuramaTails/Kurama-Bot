const isbutton = require("../interactions/isbutton");
const iscommand = require("../interactions/iscommand");
const isselectmenu = require("../interactions/isselectmenu");
const bot = require("../../bot");
module.exports = {
    name: 'interactionCreate',
	async execute(interaction) {
        if (bot.cooldownUser.has(interaction.user.id)) {
            await interaction.deferReply( {ephemeral: true});
            await interaction.followUp({ content: bot.lang.get(interaction.guild.settings.lang).interaction["cooldown"], ephemeral: true });
            return
        }
        try {
            bot.cooldownUser.set(interaction.user.id, true);
            if (interaction.isButton()) {
                await isbutton.execute(interaction,bot.client,bot.player,bot.pollUser,bot.pollCounter,bot.lang,bot.playerUser)
            }
            if (interaction.isCommand()) {
                bot.pollUser.clear(); 
                bot.pollCounter = [0,0,0,0,0]
                const command = bot.commands.get(interaction.commandName);
                await iscommand.execute(interaction,command,bot.player,bot.pollCounter,bot.lang,bot.playerUser)
            }
            if(interaction.isSelectMenu()) {
                await isselectmenu.execute(interaction,bot.lang)
            }
        } catch (error) {
            console.error(error);
            try {
                await interaction.followUp({ content: bot.lang.get(interaction.guild.settings.lang).interaction["err"], ephemeral: true });
            } catch (error) {
                console.error(error);
            } 
        } finally {
            setTimeout(() => {
                bot.cooldownUser.delete(interaction.user.id);
            }, 3*1000);
        }
	}
};
