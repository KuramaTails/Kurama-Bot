module.exports = {
	async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        var roles = await interaction.guild.roles.fetch()
        let mutedRole = roles.find(roles => roles.name === "Muted")
        member.roles.add(mutedRole);
        if (reason!=null) {
            interaction.followUp({
                content: `<@${member.id}> got muted for ${reason}`,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: `<@${member.id}> got muted `,
                ephemeral: true
            })
        }
    }
};