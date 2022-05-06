const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,customId,plugins) {
        var autorolePlugin = plugins.autorolePlugin
        switch (customId) {
            case "selectAutoroleRole":
                var selectedRole = interaction.guild.roles.cache.find(role => role.id == interaction.values[0])
                if (!selectedRole) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= selectedRole.name
                await interaction.message.edit({components:[updatePlaceholder]})
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
                autorolePlugin.role = interaction.values[0]
                interaction.followUp({
                    content: lang.get(interaction.guild.settings.lang).settings.plugins.autorolePlugin["autoRoleSet"]+` <@&${interaction.values[0]}>`,
                    ephemeral: true
                })
            break;
		}
	}
};