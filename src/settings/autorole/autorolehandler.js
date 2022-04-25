const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,customId) {
        switch (customId) {
            case "selectAutoroleRole":
                var role = interaction.values[0]
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    guildAutorolePluginRole: role
                },
                {
                    upsert:true,
                })
				guild.autoRolePlugin = {
					role:role
				}
                interaction.reply({
                    content: lang.get(interaction.guild.lang).settings["autoRoleSet"]+` <@&${interaction.values[0]}>`,
                    ephemeral: true
                })
            break;
		}
	}
};