module.exports = {
	async execute(interaction) {
        var selectedRole = await interaction.member.roles.cache.find(role => role.id == interaction.customId)
        if (!selectedRole) {
            interaction.member.roles.add(interaction.customId);
            interaction.reply({
                content: `Role <@&${interaction.customId}> added`,
                ephemeral: true
            })
        }
        else {
            interaction.member.roles.remove(interaction.customId);
            interaction.reply({
                content: `Role <@&${interaction.customId}> removed`,
                ephemeral: true
            })
        }
	}
};