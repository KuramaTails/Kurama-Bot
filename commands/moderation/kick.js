module.exports = {
    name: "kick",
    command:"kick",
    desc:'Bot will kick a member!',
    example:"/moderation kick",
    async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.kick(member)
        if (reason!=null) {
            var string = lang.get(interaction.guild.lang).buttons.roles["optMemberKickReason"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            result = string.replace("${reason}",`${reason}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.lang).buttons.roles["optMemberKick"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
    }
};