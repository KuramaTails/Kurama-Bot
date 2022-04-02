module.exports = {
    name: "ban",
    command:"ban",
    desc:'Bot will ban a member!',
    example:"/moderation ban",
    async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        interaction.guild.members.ban(member)
        if (reason!=null) {
            var string = lang.get(interaction.guild.lang).buttons.roles["optMemberBanReason"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            result = string.replace("${reason}",`${reason}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.lang).buttons.roles["optMemberBan"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
    }
};