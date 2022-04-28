module.exports = {
    name: "addrole",
    command:"addrole",
    desc:'Bot will add roles to a member!',
    example:"/moderation addrole",
	async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var role = interaction.options.getRole("role")
        var hasAlready = interaction.member.roles.cache.find(role=> role.id == interaction.options.getRole("role").id)? true : false
        if (hasAlready==false) {
            await member.roles.add(role)
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optRoleAdded"]
            var result = string.replace("${role.name}",`<@&${role.id}>`);
            result = result.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: lang.get(interaction.guild.settings.lang).commands.moderation.errors["hasAlreadyAdded"],
                ephemeral: true
            })
        }
    }
};