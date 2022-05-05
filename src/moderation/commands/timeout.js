module.exports = {
    name: "timeout",
    command:"timeout",
    desc:'Bot will timeout a member!',
    example:"/moderation timeout",
    async execute(interaction,lang) {
        var member = await interaction.guild.members.fetch(interaction.options.getUser("user"));
        var reason = (interaction.options.getString("reason"));
        member.timeout(5*60*1000)
        if (reason!=null) {
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optMemberTimeoutReason"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            result = string.replace("${reason}",`${reason}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optMemberTimeout"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
    }
};