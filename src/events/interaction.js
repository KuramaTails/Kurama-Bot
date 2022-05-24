const isbutton = require("../interactions/isbutton");
const iscommand = require("../interactions/iscommand");
const isselectmenu = require("../interactions/isselectmenu");
const bot = require("../../bot");
const ismodal = require("../interactions/ismodal");
module.exports = {
    name: 'interactionCreate',
	async execute(interaction) {
        if (bot.cooldownUser.has(interaction.user.id)) {
            interaction.deferred? '' : await interaction.deferReply( {ephemeral: true})
            var cooldownErr = bot.lang.get(interaction.guild.settings.lang).interaction["cooldown"]
            return await interaction.followUp({ content: cooldownErr, ephemeral: true })
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
            if (interaction.isModalSubmit()) {
                await ismodal.execute(interaction,bot.lang)
            }
        } catch (error) {
            var err = bot.lang.get(interaction.guild.settings.lang).interaction["err"]
            interaction.deferred? await interaction.followUp({ content: err, ephemeral: true }) : await interaction.reply({ content: err, ephemeral: true })
            console.error(error);
        } finally {
            setTimeout(() => {
                bot.cooldownUser.delete(interaction.user.id);
            }, 3*1000);
        }
	}
};
