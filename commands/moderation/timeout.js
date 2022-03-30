module.exports = {
    name: "timeout",
    command:"timeout",
    desc:'Bot will timeout a member!',
    example:"/moderation timeout",
    async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.timeout(member)
        if (reason!=null) {
            interaction.followUp({
                content: `<@${member.id}> was timed out for ${reason}`,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: `<@${member.id}> was timed out `,
                ephemeral: true
            })
        }
        
    }
};