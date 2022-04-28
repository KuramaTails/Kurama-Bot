module.exports = {
	async execute(interaction,roleId,lang) {
        var roles = await interaction.guild.roles.resolve(roleId)
        var memberRole = await interaction.member.roles.cache.find(role => role.id == roleId)
        try {
            if (!memberRole) {
                var string = lang.get(interaction.guild.settings.lang).commands.moderation["optRoleAdded"]
                var result = string.replace("${role.name}",`<@&${roles.id}>`);
                result = result.replace("<@${member.id}>",`<@${interaction.member.id}>`);
                await interaction.member.roles.add(roles);
            }
            else {
                var string = lang.get(interaction.guild.settings.lang).commands.moderation["optRoleRemoved"]
                var result = string.replace("${role.name}",`<@&${roles.id}>`);
                result = result.replace("<@${member.id}>",`<@${interaction.member.id}>`);
                await interaction.member.roles.remove(roles);
            }
            interaction.reply({
                content: result,
                ephemeral: true
            })
        } catch (error) {
            interaction.reply({
                content: "Missing Permissions",
                ephemeral: true
            })
        }
	}
};
