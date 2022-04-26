const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,customId,plugins) {
        var autorolePlugin = plugins.autorolePlugin
        switch (customId) {
            case "selectAutoroleRole":
                await dbconnect()
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.autorolePlugin.role": interaction.values[0],
                    }
                },
                {
                    upsert:true,
                })
                await dbdisconnect()
                autorolePlugin.role = interaction.values[0]
                interaction.followUp({
                    content: lang.get(interaction.guild.settings.lang).settings["autoRoleSet"]+` <@&${interaction.values[0]}>`,
                    ephemeral: true
                })
            break;
		}
	}
};