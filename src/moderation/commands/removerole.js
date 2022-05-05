module.exports = {
    name: "removerole",
    command:"removerole",
    desc:'Bot will remove roles to a member!',
    example:"/moderation removerole",
	async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var role = interaction.options.getRole("role")
        var hasAlready = member.roles.cache.find(role=> role.id == interaction.options.getRole("role").id)? true : false
        if (hasAlready==true) {
            await member.roles.remove(role);
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optRoleRemoved"]
            var result = string.replace("${role.name}",`<@&${role.id}>`);
            result = result.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content:result,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: lang.get(interaction.guild.settings.lang).commands.moderation.errors["hasAlreadyRemoved"],
                ephemeral: true
            })
        }
        
    }
};