module.exports = {
    async execute(interaction) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.ban(member)
        if (reason!=null) {
            interaction.followUp({
                content: `<@${member.id}> was banned for ${reason}`,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: `<@${member.id}> was banned `,
                ephemeral: true
            })
        }
        
    }
};