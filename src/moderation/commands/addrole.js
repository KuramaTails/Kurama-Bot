module.exports = {
    name: "addrole",
    command:"addrole",
    desc:'Bot will add roles to a member!',
    example:"/moderation addrole",
	async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var role = interaction.options.getRole("role")
        member.roles.add(role);
        var string = lang.get(interaction.guild.lang).commands.moderation["optRoleAdded"]
        let result = string.replace("<@&${roleId}>",`<@&${role.id}>`);
        interaction.followUp({
            content: result,
            ephemeral: true
        })
    }
};