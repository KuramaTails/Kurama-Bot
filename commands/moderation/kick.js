module.exports = {
    name: "kick",
    command:"kick",
    desc:'Bot will kick a member!',
    example:"/moderation kick",
    async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.kick(member)
        if (reason!=null) {
            interaction.followUp({
                content: `<@${member.id}> was kicked for ${reason}`,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: `<@${member.id}> was kicked `,
                ephemeral: true
            })
        }
        
    }
};