module.exports = {
	async execute(interaction,roleId) {
        var memberRole = await interaction.member.roles.cache.find(role => role.id == roleId)
        if (!memberRole) {
            interaction.member.roles.add(roleId);
            interaction.reply({
                content: `Role <@&${roleId}> added`,
                ephemeral: true
            })
        }
        else {
            interaction.member.roles.remove(roleId);
            interaction.reply({
                content: `Role <@&${roleId}> removed`,
                ephemeral: true
            })
        }
	}
};