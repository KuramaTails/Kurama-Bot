module.exports = {
    name: "addrole",
    command:"addrole",
    desc:'Bot will add roles to a member!',
    example:"/moderation addrole",
	async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var role = interaction.options.getRole("role")
        member.roles.add(role);
        interaction.followUp({
            content: `Role ${role.name} added to <@${member.id}>`,
            ephemeral: true
        })
    }
};