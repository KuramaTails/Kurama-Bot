module.exports = {
	async execute(interaction,roleId,lang) {
        var memberRole = await interaction.member.roles.cache.find(role => role.id == roleId)
        if (!memberRole) {
            interaction.member.roles.add(roleId);
            interaction.reply({
                content: lang.get(interaction.guild.lang).strings["ROLE"] + ` <@&${roleId}> ` + (lang.get(interaction.guild.lang).strings["ADDED"]).toLowerCase() ,
                ephemeral: true
            })
        }
        else {
            interaction.member.roles.remove(roleId);
            interaction.reply({
                content: lang.get(interaction.guild.lang).strings["ROLE"] + ` <@&${roleId}> ` + (lang.get(interaction.guild.lang).strings["REMOVED"]).toLowerCase(),
                ephemeral: true
            })
        }
	}
};

