module.exports = {
    name: "removerole",
    command:"removerole",
    desc:'Bot will remove roles to a member!',
    example:"/moderation removerole",
	async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var role = interaction.options.getRole("role")
        member.roles.remove(role);
        interaction.followUp({
            content: `Role ${role.name} removed to <@${member.id}>`,
            ephemeral: true
        })
    }
};