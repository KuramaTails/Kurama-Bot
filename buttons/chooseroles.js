module.exports = {
	async execute(interaction,roleId,lang) {
        var memberRole = await interaction.member.roles.cache.find(role => role.id == roleId)
        if (!memberRole) {
            var string = lang.get(interaction.guild.lang).strings["optRoleAdded"]
            let result = string.replace("<@&${roleId}>",`<@&${roleId}>`);
            interaction.member.roles.add(roleId);
            interaction.reply({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.lang).strings["optRoleRemoved"]
            let result = string.replace("<@&${roleId}>",`<@&${roleId}>`);
            interaction.member.roles.remove(roleId);
            interaction.reply({
                content: result,
                ephemeral: true
            })
        }
	}
};

