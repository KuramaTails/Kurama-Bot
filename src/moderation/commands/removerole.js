module.exports = {
    name: "removerole",
    command:"removerole",
    desc:'Bot will remove roles to a member!',
    example:"/moderation removerole",
	async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var role = interaction.options.getRole("role")
        member.roles.remove(role);
        var string = lang.get(interaction.guild.lang).commands.moderation["optRoleRemoved"]
        let result = string.replace("<@&${roleId}>",`<@&${role.id}>`);
        interaction.followUp({
            content:result,
            ephemeral: true
        })
    }
};