module.exports = {
    name: "unban",
    command:"unban",
    desc:'Bot will unban a member!',
    example:"/moderation unban",
    async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.unban(member)
        if (reason!=null) {
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optMemberUnbanReason"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            result = string.replace("${reason}",`${reason}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optMemberUnban"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
    }
};