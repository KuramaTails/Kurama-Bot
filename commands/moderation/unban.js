module.exports = {
    name: "unban",
    command:"unban",
    desc:'Bot will unban a member!',
    example:"/moderation unban",
    async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.unban(member)
        if (reason!=null) {
            interaction.followUp({
                content: `<@${member.id}> was unbanned for ${reason}`,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: `<@${member.id}> was unbanned `,
                ephemeral: true
            })
        }
        
    }
};